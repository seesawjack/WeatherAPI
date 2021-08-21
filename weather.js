
var today = new Date()
var Today =today.getFullYear()+ " 年 " + (today.getMonth()+1) + " 月 " + today.getDate() + " 日"
var cardgroup = document.querySelector('.card-group')

function getWeatherInfo(_time){
    cardgroup.innerHTML = ``
    fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-B5282D9D-8FDD-40E9-AD48-B1DF3270465D')
    .then(function (response) {
        return response.json();
    })
    .then(function (weatherData) {
        var Location = weatherData.records.location

        Location.forEach(element => {
            var Name = element.locationName//城市名稱
            var Wx = element.weatherElement[0].time[_time].parameter.parameterName//天氣現象
            var PoP = element.weatherElement[1].time[_time].parameter.parameterName//降雨機率
            var MinT = element.weatherElement[2].time[_time].parameter.parameterName//最低溫
            var MaxT = element.weatherElement[4].time[_time].parameter.parameterName//最高溫
            
            
            //根據不同的降雨機率決定給予的建議
            var Suggest
            if (PoP == 0) {
                Suggest = '出門記得防曬'
            } else if (PoP < 30) {  
                Suggest = '出門記得防曬'
            }else if (PoP < 50) {  
                Suggest = '建議攜帶雨具出門'
            } else if (PoP < 75) {
                Suggest = '建議搭乘大眾運輸工具'
            } else {
                Suggest = '必帶雨具'
            }

            //根據不同的天氣現象決定不同的天氣svg
            var weather_img
            if(Wx.includes("晴")){
                weather_img=`
                <svg class="sunny" viewbox="15 15 70 70">
                    <circle id="sun" cx="50" cy="50" r="20">
                        <animateTransform dur="5s" attributeName="transform" repeatCount="indefinite" type="rotate" from="0,50,50"
                            to="360,50,50" />
                    </circle>
                </svg>`
            }
            if(Wx.includes("多雲")){
                weather_img=`
                <svg class="cloudy" viewbox="0 0 100 100">
                    <g id="cloud">
                        <circle cx="37" cy="40" r="15"></circle>
                        <circle cx="55" cy="45" r="14"></circle>
                        <rect width="70" height="30" x="10" y="40" rx="15"></rect>
                        <animateTransform attributeName="transform" type="translate" values="10,0;-5,0;10,0" dur="2s"
                            repeatCount="indefinite" />
                    </g>
                    <g id="cloud2">
                        <circle cx="32" cy="35" r="13"></circle>
                        <circle cx="50" cy="40" r="12"></circle>
                        <rect width="70" height="30" x="5" y="40" rx="15"></rect>
                        <animateTransform attributeName="transform" type="translate" values="-5,20;10,20;-5,20" dur="2s"
                            repeatCount="indefinite" />
                    </g>
                    <animateTransform attributeName="transform" dur="0.1s" type="scale" values="1.5"/>
                </svg>`
            }
            if(Wx.includes("陰")){
                weather_img=`
                <svg class="overcast" viewbox="0 0 100 100">
                    <g id="overcast_cloud">
                        <circle cx="37" cy="40" r="15"></circle>
                        <circle cx="55" cy="45" r="14"></circle>
                        <rect width="70" height="30" x="10" y="40" rx="15"></rect>
                        <animateTransform attributeName="transform" type="translate" values="10,0;-5,0;10,0" dur="2s"
                            repeatCount="indefinite" />
                    </g>
                    <g id="overcast_cloud2">
                        <circle cx="32" cy="35" r="13"></circle>
                        <circle cx="50" cy="40" r="12"></circle>
                        <rect width="70" height="30" x="5" y="40" rx="15"></rect>
                        <animateTransform attributeName="transform" type="translate" values="-5,20;10,20;-5,20" dur="2s"
                            repeatCount="indefinite" />
                    </g>
                </svg>`
            }
            if(Wx.includes("陰")&&Wx.includes("雨")){
                weather_img=`
                <svg class="rainy" viewbox="0 10 100 100">
                    <g id="rain">
                        <rect width="2" height="7" x="45" y="60" rx="1">
                            <animateTransform dur="1.5s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                values="30,10,50;30,-150,-20" />
                        </rect>
                        <rect width="2" height="7" x="60" y="60" rx="1">
                            <animateTransform dur="1.8s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                values="30,50,50;30,-150,-20" />
                        </rect>
                        <rect width="2" height="7" x="75" y="55" rx="1">
                            <animateTransform dur="1.3s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                values="30,50,60;30,-150,-20" />
                        </rect>
                        <rect width="2" height="7" x="65" y="45" rx="1">
                            <animateTransform dur="1.2s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                values="30,50,60;30,-150,-20" />
                        </rect>
                        <animateTransform link attributeName="transform" type="translate" values="-5,-5;10,0;-5,-5" dur="2s"
                            repeatCount="indefinite" />
                    </g>
                    <g id="overcast_cloud">
                        <circle cx="37" cy="40" r="15"></circle>
                        <circle cx="55" cy="45" r="14"></circle>
                        <rect width="70" height="30" x="10" y="40" rx="15"></rect>
                        <animateTransform attributeName="transform" type="translate" values="10,0;-5,0;10,0" dur="2s"
                            repeatCount="indefinite" />
                    </g>
                    <g id="overcast_cloud2">
                        <circle cx="32" cy="35" r="13"></circle>
                        <circle cx="50" cy="40" r="12"></circle>
                        <rect width="70" height="30" x="5" y="40" rx="15"></rect>
                        <animateTransform attributeName="transform" type="translate" values="-5,15;10,15;-5,15" dur="2s"
                            repeatCount="indefinite" />
                    </g>
                </svg>`
            }
            if(Wx.includes("雷")&&Wx.includes("雨")){
                weather_img=`
                <svg class="rainy_thunder" viewbox="0 10 100 100">
                    <g id="rain">
                        <rect width="2" height="7" x="45" y="60" rx="1">
                            <animateTransform dur="0.6s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                values="30,10,50;30,-150,-20" />
                        </rect>
                        <rect width="2" height="7" x="60" y="60" rx="1">
                            <animateTransform dur="0.8s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                values="30,50,50;30,-150,-20" />
                        </rect>
                        <rect width="2" height="7" x="75" y="55" rx="1">
                            <animateTransform dur="0.7s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                values="30,50,60;30,-150,-20" />
                        </rect>
                        <rect width="2" height="7" x="65" y="45" rx="1">
                            <animateTransform dur="0.5s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                values="30,50,60;30,-150,-20" />
                        </rect>
                        <animateTransform link attributeName="transform" type="translate" values="-5,-5;10,0;-5,-5" dur="2s"
                            repeatCount="indefinite" />
                    </g>
                    <g>
                        <polyline id="thunder" points="50,38 46,50 52,50 50,60 56,47 50,47 50,38">
                            <animateTransform dur="2.5s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                values="30,50,60;30,-150,-20" />
                        </polyline>
                        <polyline id="thunder" points="50,38 46,50 52,50 50,60 56,47 50,47 50,38">
                            <animateTransform dur="3s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                values="10,60,100;-100,200,10" />
                        </polyline>
                    </g>
                    <g id="overcast_cloud">
                        <circle cx="37" cy="40" r="15"></circle>
                        <circle cx="55" cy="45" r="14"></circle>
                        <rect width="70" height="30" x="10" y="40" rx="15"></rect>
                        <animateTransform attributeName="transform" type="translate" values="10,0;-5,0;10,0" dur="2s"
                            repeatCount="indefinite" />
                    </g>
                    <g id="overcast_cloud2">
                        <circle cx="32" cy="35" r="13"></circle>
                        <circle cx="50" cy="40" r="12"></circle>
                        <rect width="70" height="30" x="5" y="40" rx="15"></rect>
                        <animateTransform attributeName="transform" type="translate" values="-5,15;10,15;-5,15" dur="2s"
                            repeatCount="indefinite" />
                    </g>
                </svg>`
                }
            if(Wx.includes("晴")&&Wx.includes("雲")){
                weather_img=`
                <svg class="cloudy_sunny" viewbox="0 -5 100 100">
                    <circle id="sun" cx="60" cy="40" r="15">
                        <animateTransform dur="5s" attributeName="transform" repeatCount="indefinite" type="rotate" from="0,60,40"
                            to="360,60,40" />
                    </circle>
                    <g id="cloud">
                        <circle cx="32" cy="35" r="15"></circle>
                        <circle cx="50" cy="40" r="14"></circle>
                        <rect width="70" height="30" x="5" y="35" rx="15"></rect>
                        <animateTransform attributeName="transform" type="translate" values="-5,10;10,10;-5,10" dur="2s"
                            repeatCount="indefinite" />
                    </g>
                </svg> `
            } 
            

            
            
           
            cardgroup.innerHTML +=
                `<div class="card">
                    <div class="topcard">
                        <div class="cityname">
                            <span>${Name}</span>
                            <span>${Today}</span>
                            </div>
                        <div class="temp">${MinT}°C</div>
                        <div class="wx">
                            <span>${weather_img}</span>
                        </div>
                        <div class="pop">
                            <span>降雨機率</span>
                            <span>${PoP}%</span>
                        </div>
                    </div>
                    <div class="botcard">
                        <div class="maxt">
                            <span>最高溫</span>
                            <span>${MaxT}°C</span>
                        </div>
                        <div class="mint">
                            <span>最低溫</span>
                            <span>${MinT}°C</span>
                        </div>
                        <div class="suggest">
                            <span>外出建議</span>
                            <span>${Suggest}</span>
                        </div>
                    </div>
                </div>`
        });
        
    });


}