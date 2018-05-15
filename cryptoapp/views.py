# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, render_to_response

import urllib, json
# Create your views here.
import requests
def index(request):
    #url = 'https://api.coinmarketcap.com/v2/ticker/?limit=5'
    #response = urllib.urlopen(url)
    #data = json.loads(response.read())
    #print(data)
    return render(request, 'cryptoapp/index.html')

def getprices(request):
    #print(request.GET['id'])
    return render_to_response('cryptoapp/price_history.html')