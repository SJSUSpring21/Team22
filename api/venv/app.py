import time 
from flask import Flask, request
import json

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/getChartDetails')
def get_chart():
    return {"data": [
      ['Time','122095', '123347', '129635',{'role': 'annotation' } ],
      ['Week 1', 10, 24, 20, ''],
      ['Week 2', 16, 22, 23,''],
      ['Week 3', 28, 19, 29,''],
      ['Week 4', 28, 19, 29,''],
      ['Week 5', 18, 19, 29,''],
      ['Week 6', 28, 49, 29,''],
      ['Week 7', 48, 19, 69,''],
      ['Week 8', 8, 43, 77,'']
    ]}

@app.route('/getOutletNumberBasedOnTier',methods=['POST'])
def get_outlet_data():
    f = open('data/train.json',encoding='utf-8-sig')
    data = json.load(f)
    a = []
    for i in data:
        if i['Outlet_Location_Type'] == request.json['tier']:
            a.append(i)
        
    f.close()
    return {
        "data" : a
    }