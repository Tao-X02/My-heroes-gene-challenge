import re
from PIL import Image
import cv2
import pytesseract
from pytesseract import Output, pytesseract
import os

file_path = r"C:\Users\Paula\UofTHacks\dataset\VarientxUofTHacks Gene Resource\ARSE.png"
pytesseract.tesseract_cmd = r"C:/Program Files/Tesseract-OCR/tesseract.exe"

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

    cv2.imwrite('output.png', img) # Modify this
    return found

if __name__ == '__main__':
    label_image(file_path)
