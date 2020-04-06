var userKey ="02I5WXPLLEDWX3JV";

var channelID1 = 1011568;
var readKey1 = "ZN6JY39YGYW6V9BQ"; 
var writeKey1 = "20O14P1J5712NITR"; 

var channelID2 = 1027530;
var readKey2 = "OT0IDVJUQM0AFR5J"; 
var writeKey2 = "TVOKYYQOWW2I93HY"; 

var dataField1_1; /* Tank 1 */
var dataField1_2; /* Tank 2 */
var dataField1_3; /* Flow Rate */
var dataField1_4; /* Input Voltage */
var dataField2_1; /* Set Point */
var dataField2_2; /* Proportional */
var dataField2_3; /* Integral */
var dataField2_4; /* Derivative */
var dataField2_5; /* On Off Status */

var chart1Config = {
  type: 'cylinder',
    dataFormat: 'json',
    renderAt: 'chart-container1',
    width: '450',
    height: '295',
    dataSource: {
        "chart": {
            "theme": "fusion",
            "caption": "Tank 1",
            "lowerLimit": "0",
            "upperLimit": "30",
            "lowerLimitDisplay": "0",
            "upperLimitDisplay": "30",
            "numberSuffix": " cm",
            "showValue": "1",
            "chartBottomMargin": "45",
            "majorTMNumber":"7",
            "minorTMNumber":"4",
            "cylFillColor": "#1aaf5d",
            "cyloriginx": "225",
            "cyloriginy": "210",
            "cylheight": "150"
        },
        "value": "0"

    },
    "events": {
        "rendered": function(evtObj, argObj) {
            var fuelVolume = 0;
            evtObj.sender.chartInterval = setInterval(function() {
                var consVolume = getDataField1_1();
                evtObj.sender.feedData && evtObj.sender.feedData("&value=" + consVolume);
                fuelVolume = consVolume;
            }, 2000);
        },
        "disposed": function(evt, arg) {
            clearInterval(evt.sender.chartInterval);
        }
    }
};

var chart2Config = {
  type: 'cylinder',
  dataFormat: 'json',
  renderAt: 'chart-container2',
  width: '450',
  height: '295',
  dataSource: {
      "chart": {
          "theme": "fusion",
          "caption": "Tank 2",
          "lowerLimit": "0",
          "upperLimit": "30",
          "lowerLimitDisplay": "0",
          "upperLimitDisplay": "30",
          "numberSuffix": " cm",
          "showValue": "1",
          "chartBottomMargin": "45",
          "majorTMNumber":"7",
          "minorTMNumber":"4",
          "cylFillColor": "#1aaf5d",
          "cyloriginx": "225",
          "cyloriginy": "210",
          "cylheight": "150"
      },
      "value": "0"
  },
  "events": {
      "rendered": function(evtObj, argObj) {
      var fuelVolume = 0;
      evtObj.sender.chartInterval = setInterval(function() {
          var consVolume = getDataField1_2();
          evtObj.sender.feedData && evtObj.sender.feedData("&value=" + consVolume);
          fuelVolume = consVolume;
          }, 2000);
      },
      "disposed": function(evt, arg) {
      clearInterval(evt.sender.chartInterval);
      }
  } 
};

/*  Draw Google Gauges  */

function drawGauge() {

    var data3 = google.visualization.arrayToDataTable([
      ['Parameter', 'Value'],
      ['Flow Rate', 0]
    ]);
    var gauge3 = new google.visualization.Gauge(document.getElementById('chart-gauge3'));
    setInterval(function() {
      data3.setValue(0, 1, getDataField1_3());
      var GaugeOptions = { height: 295, majorTicks: ['0','1','2','3'], minorTicks: 5};
      gauge3.draw(data3, GaugeOptions);
    }, 1000);

    var data4 = google.visualization.arrayToDataTable([
        ['Parameter', 'Value'],
        ['Input Voltage', 0]
      ]);
    var gauge4 = new google.visualization.Gauge(document.getElementById('chart-gauge4'));
    setInterval(function() {
      data4.setValue(0, 1, getDataField1_4());
      var GaugeOptions = { height: 295, majorTicks: ['0','1','2','3','4','5','6','7','8','9'], minorTicks: 5};
      gauge4.draw(data4, GaugeOptions);
    }, 1000);  
  } 



/*Retrieve Output Parameters from ThingSpeak  */

function getDataField1_1() {     
  $.getJSON('https://api.thingspeak.com/channels/'+channelID1+'/fields/1/last.json?api_key='+readKey1, function(data){          
        dataField1_1 = data.field1; //Json created at: entry_id: field_:
        if (dataField1_1) {
            dataField1_1 = (dataField1_1/1);
        }      
  });    
  return dataField1_1;
}

function getDataField1_2() {           
  $.getJSON('https://api.thingspeak.com/channels/'+channelID1+'/fields/2/last.json?api_key='+readKey1, function(data) {          
      dataField1_2 = data.field2;
      if (dataField1_2) {
          dataField1_2 = (dataField1_2/1);
      }          
  });
  return dataField1_2;
}

function getDataField1_3() {           
  $.getJSON('https://api.thingspeak.com/channels/'+channelID1+'/fields/3/last.json?api_key='+readKey1, function(data) {          
        dataField1_3 = data.field3;
        if (dataField1_3) {
            dataField1_3 = (dataField1_3/1);
        }          
  });
  return dataField1_3;
}

function getDataField1_4() {           
  $.getJSON('https://api.thingspeak.com/channels/'+channelID1+'/fields/4/last.json?api_key='+readKey1, function(data) {          
      dataField1_4 = data.field4;
      if (dataField1_4) {
          dataField1_4 = (dataField1_4/1);
      }          
  });
  return dataField1_4;
}

/*  Retrieve Tuning Parameters from ThingSpeak  */ 

function getDataField2() {           
  $.getJSON('https://api.thingspeak.com/channels/'+channelID2+'/fields/1/last.json?api_key='+readKey2, function(data) {          
    dataField2_1 = data.field1;
    if (dataField2_1) {
        dataField2_1 = (dataField2_1/1);
    }          
  });

  $.getJSON('https://api.thingspeak.com/channels/'+channelID2+'/fields/2/last.json?api_key='+readKey2, function(data) {          
    dataField2_2 = data.field2;
    if (dataField2_2) {
        dataField2_2 = (dataField2_2/1);
    }          
  });

  $.getJSON('https://api.thingspeak.com/channels/'+channelID2+'/fields/3/last.json?api_key='+readKey2, function(data) {          
    dataField2_3 = data.field3;
    if (dataField2_3) {
        dataField2_3 = (dataField2_3/1);
    }          
  });

  $.getJSON('https://api.thingspeak.com/channels/'+channelID2+'/fields/4/last.json?api_key='+readKey2, function(data) {          
    dataField2_4 = data.field4;
    if (dataField2_4) {
        dataField2_4 = (dataField2_4/1);
    }          
  });

  $.getJSON('https://api.thingspeak.com/channels/'+channelID2+'/fields/5/last.json?api_key='+readKey2, function(data) {          
    dataField2_5 = data.field5;
    if (dataField2_5) {
        dataField2_5 = (dataField2_5/1);
    }          
  });
}

/*  Tuning the Controller  */

function tuningKs(){
  var SetPoint = document.getElementById("SetP").value;
  var Proportional = document.getElementById("PGain").value;
  var Integral = document.getElementById("IGain").value;
  var Derivative = document.getElementById("DGain").value;
  if (SetPoint=="" || Proportional=="" || Integral=="" || Derivative=="") {
    alert("Enter a Valid Number");
    return false;
  };
  changeTuning(SetPoint, Proportional, Integral, Derivative);
  alert ("Notice\nThe tuning parameters is successfully uploaded.\nPlease check at the 'Current Parameter' section.");
}

/*  Update tuning at ThingSpeak  */      

function changeTuning(data1, data2, data3, data4) {
  $(document).ready(function(){
      $.post("https://api.thingspeak.com/update.json",
      {
        api_key: writeKey2,
        field1: data1,
        field2: data2,
        field3: data3,
        field4: data4,
        field5: "0"
      })
  })
}

/*  On Off function  */

function startSys() {
  $(document).ready(function(){
      $.post("https://api.thingspeak.com/update.json",
      {
        api_key: writeKey2,
        field5: "1",
      })
  })
}

function stopSys() {
  $(document).ready(function(){
      $.post("https://api.thingspeak.com/update.json",
      {
        api_key: writeKey2,
        field5: "0",
      })
  })
}

/*  Interval Action to Update the Tuning Parameter's UI */

setInterval(function update(){
  getDataField2();
  document.getElementById('CurrentSetP').innerHTML = dataField2_1;
  document.getElementById('CurrentPGain').innerHTML = dataField2_2;
  document.getElementById('CurrentIGain').innerHTML = dataField2_3;
  document.getElementById('CurrentDGain').innerHTML = dataField2_4;
  var input = dataField2_5;
  var image = document.getElementById('OnOff'); 
  if (input == "1") {
    image.src = "images/OnButton.jpg";
  } else{
    image.src = "images/OffButton.jpg"; 
  }
},2000);

/*  Download csv file  */
function downloadFile(){
  $.ajax({
    type : "GET",
    url : "https://api.thingspeak.com/channels/"+channelID1+"/feeds.csv?api_key="+readKey1,
    success : 
    function(data)
    {   
        var data1_1 = data.split('\n').map(function(line) {
            var columns = line.split(',');  // get the columns
            columns.splice(1, 1);           // remove entry_id column
            return columns;
            }).join('\n');                  // join on newlines
        
        var data1_2 = data1_1.split('\n');
        var header = data1_2[0].split(',');
        header.splice(1,4,"water_level_1","water_level_2","flow_rate","input_voltage","set_point","proportional","integral","derivative","on_off");
        data1_2[0] = header;
        data1_1 = data1_2.join('\n');

        $.ajax({
            type : "GET",
            url : "https://api.thingspeak.com/channels/"+channelID2+"/feeds.csv?api_key="+readKey2,
            success : 
            function(data)
            { 
                var data2_1 = data.split('\n').map(function(line) {
                    var columns = line.split(',');                  // get the columns
                    columns.splice(1, 1, "","","","");              // remove entry_id column
                    return columns;
                    }).join('\n');                                  // join on newlines

                var data2_2 = data2_1.split('\n');
                data2_2.splice(0,1);                                //remove first header
                data2_1 = data2_2.join('\n');
                data = data1_1.concat(data2_1);

                var downloadLink = document.createElement("a");
                var blob = new Blob(["\ufeff", data]);
                var url = URL.createObjectURL(blob);
                downloadLink.href = url;
                downloadLink.download = "CTS2020.csv";
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);

                alert("Notice\nIt is recommended to use 'Sort' under the 'Data' tab in MsExcel.")
            }
        });
    }
  });
}

/*  Clear data  */
function clearData(){
  $.ajax({
    type : "DELETE",
    url : "https://api.thingspeak.com/channels/"+channelID1+"/feeds.json?api_key="+userKey,
    success : 
    function(data){
        $.ajax({
          type : "DELETE",
          url : "https://api.thingspeak.com/channels/"+channelID2+"/feeds.json?api_key="+userKey,
          success : 
          function(data)
          {
              alert("Notice\nAll data have successfully deleted.")
          }
        }); 
    }
  });
}



