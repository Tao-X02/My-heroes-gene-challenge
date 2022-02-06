from PIL import Image
from pytesseract import pytesseract, Output
import os
import spacy
import cv2
import streamlit as st

pytesseract.tesseract_cmd = r"C:/Program Files/Tesseract-OCR/tesseract.exe"

def img_to_txt(file_name):
    img = Image.open(file_name)
    print('image is loaded')
    text = pytesseract.image_to_string(file_name)
    return text

def gene_interest():
    file_name = os.path.basename(filename).split('.')[0]
    if '_' in file_name:
        underscore_index = file_name.index('_')
        file_name = file_name[:underscore_index]
    print(file_name)

def extract_keywords(text):
    gene_interest()
    line_list = []
    result_index = 0
    paragraphs = text.split('\n\n')
    for line in paragraphs:
        if ('result' or 'summary') in line.lower():
            result_index = paragraphs.index(line)
            break
    results = paragraphs[result_index:]
    results_paragraphs = '\n\n'.join(results)
    nlp = spacy.load("en_ner_bionlp13cg_md")
    if results_paragraphs != []:
        doc = nlp(results_paragraphs)
    else:
        doc = nlp(text)
    words = doc.ents
    keywords = list(words)
    keyword_strings = []
    for item in keywords:
        keyword_strings.append(str(item).rstrip())
    keyword_strings = list(dict.fromkeys(keyword_strings))
    return keyword_strings

def check_similarity(a, b):
    chars_to_remove = "1ltLT"
    for char in chars_to_remove:
        a = a.replace(char, "")
        b = b.replace(char, "")
    if (a in b):
        return True
    return False

def label_image(file_name):
    gene_name = os.path.basename(file_name).split(".")[0].split("_")[0]

    # Check if found
    found = False
    img = cv2.imread(file_name)
    d = pytesseract.image_to_data(img, output_type=Output.DICT)
    keys = list(d.keys())

    # Iterate
    n_boxes = len(d['text'])
    for i in range(n_boxes):
        if check_similarity(gene_name, d['text'][i]):
            found = True
            (x, y, w, h) = (d['left'][i], d['top'][i], d['width'][i], d['height'][i])
            img = cv2.rectangle(img, (x - 6, y - 6), (x + w + 9, y + h + 9), (0, 255, 0), 2)

    if (found == False):
        font = cv2.FONT_HERSHEY_SIMPLEX
        img = cv2.putText(img,'No gene was found on report',(100,500), font, 2, (255, 0, 0), 2, cv2.LINE_AA)

    cv2.imwrite('output.png', img) # Modify this
    return found


def file_selector(folder_path='.'):
    filenames = os.listdir(folder_path)
    selected_filename = st.selectbox("Select a file", filenames)
    return os.path.join(folder_path, selected_filename)

if __name__ == '__main__':
    if st.checkbox("select a file in current directory"):
        folder_path = '.'
        if st.checkbox('Change directory'):
            folder_path = st.text_input('Enter folder path')
        filename = file_selector(folder_path=folder_path)
        image = Image.open(filename)
        st.write('You selected `%s`' % filename)
        label = label_image(filename)
        if label is True:
            label = "your target gene is present in the report."
        else:
            label = "Your target gene is not present in the report."
        st.image('output.png', caption=label)
        keyword_text = "Here are the keywords that might be helpful:"
        st.text(keyword_text)
        st.text(extract_keywords(img_to_txt(filename)))



