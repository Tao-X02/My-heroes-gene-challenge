from PIL import Image
from pytesseract import pytesseract
import os
import spacy

pytesseract.tesseract_cmd = r"C:/Program Files/Tesseract-OCR/tesseract.exe"
image_path = r"C:\Users\Paula\UofTHacks\dataset\VarientxUofTHacks Gene Resource\ARSE.png"

def img_to_txt():
    img = Image.open(image_path)
    print('image is loaded')
    text = pytesseract.image_to_string(image_path)
    return text

def gene_interest():
    file_name = os.path.basename(image_path).split('.')[0]
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








if __name__ == "__main__":
    preprocessed_txt = img_to_txt()
    extract_keywords(preprocessed_txt)


