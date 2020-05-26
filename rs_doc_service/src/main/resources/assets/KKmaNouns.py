#!/usr/bin/pyhton
# -*- coding: utf-8 -*-
import sys
import json
import io
from sklearn.feature_extraction.text import TfidfVectorizer
from konlpy.tag import Kkma, Twitter
from konlpy.utils import pprint
import re

sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')
sys.stdin = io.TextIOWrapper(sys.stdin.detach(), encoding = 'utf-8')

def main(str_string) :
    sample_dat = re.findall(r"[\w']+", str_string)
    result = ' '.join(sample_dat)

    kkma = Kkma()

    doc_nouns_list = []
    nouns = kkma.nouns(str_string)
    doc_nouns_list.append(nouns)
    nouns_list_str = ','.join(list(filter(lambda x: len(x) > 1, doc_nouns_list[0])))
    print(nouns_list_str, end='')
if __name__ == "__main__" :
    main(' '.join(sys.argv[1:]))

