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

@app.route('/getcategoryBasedOnOutletIdentifier',methods=['POST'])
def get_Outlet_Identifier():
    f = open('data/train.json',encoding='utf-8-sig')
    data = json.load(f)
    a = []
    for i in data:
        if i['Outlet_Identifier'] == request.json['outlet']:
            a.append(i['Item_Type'])        
    a = list(set(a)) 
    a.sort()
    f.close()
    return {
        "data" : a
    }

@app.route('/getitemnoBasedOnCategory',methods=['POST'])
def get_Item_Type():
    f = open('data/train.json',encoding='utf-8-sig')
    data = json.load(f)
    a = []
    for i in data:
        if i['Item_Type'] == request.json['category']:
            a.append(i['Item_Identifier'])
    a = list(set(a)) 
    a.sort()
    f.close()
    return {
        "data" : a
    }
@app.route('/getOutletOverview',methods=['POST'])
def get_outletOverview():
    f = open('data/train.json',encoding='utf-8-sig')
    data = json.load(f)
    categories = get_Categories(data, request.json['outlet'])
    return categories

def get_Categories(data, outlet):
    categories = {
    'Snack Foods':0,
    'Fruits and Vegetables':0,
    'Household':0,
    'Frozen Foods':0,
    'Dairy':0,
    'Baking Goods':0,
    'Canned':0,
    'Meat':0,
    'Health and Hygiene':0,
    'Soft Drinks':0,
    'Others':0,
    'Breads':0,
    'Breakfast':0,
    'Hard Drinks':0,
    'Seafood':0,
    'Starchy Foods':0,
    }
    for i in data:
        if i['Outlet_Identifier'] == outlet:
            Item_Type=i['Item_Type']
            categories[Item_Type] = categories[Item_Type]+float(i['Item_Outlet_Sales'])
    return json.dumps(categories)    

@app.route('/getTierLevelOverview',methods=['POST'])
def getTierLevelData():
    dict={}
    outlets =[]
    tierLevelData=[]
    f = open('data/train.json',encoding='utf-8-sig')
    data = json.load(f)
    for i in data:
        if i['Outlet_Location_Type'] == request.json['tier']:
            outlets.append(i['Outlet_Identifier'])
            tierLevelData.append(i)
    outlets = set(outlets)
    for outlet in outlets:
        dict[outlet]={}
        dict[outlet]=get_Categories(tierLevelData, outlet)
    return json.dumps(dict)
    
@app.route('/getItemFatContent',methods=['POST'])
def getCategoryRelatedInfo():
    categories = {
    'Low Fat':0,
    'Regular':0
    }
    f = open('data/train.json',encoding='utf-8-sig')
    data = json.load(f)
    for i in data:
        if i['Outlet_Identifier'] == request.json['outlet']:
            if i['Item_Type'] == request.json['category']:
                Item_Fat_Content=i['Item_Fat_Content']
                if (Item_Fat_Content == "Low Fat") or (Item_Fat_Content == "LF"):
                    categories['Low Fat'] = categories['Low Fat']+float(i['Item_Outlet_Sales'])
                else:
                    categories['Regular'] = categories['Regular']+float(i['Item_Outlet_Sales'])
    return json.dumps(categories) 






