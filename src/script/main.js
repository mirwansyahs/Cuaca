function main() {
    const baseUrl = "https://data.bmkg.go.id/datamkg/MEWS/DigitalForecast/DigitalForecast-JawaBarat.xml";
    const getData = (namaDaerah = '') => {
        fetch(`${baseUrl}`, {
            method: 'GET',
	        mode: 'cors'
        })
        .then(response => {
            return response.text();
        })
        .then(response => {
                renderAllBooks(response, namaDaerah);
            
        })
        .catch(error => {
            showResponseMessage();
        })
    };

    const getTime = (jumlahReturn = '') =>{
        var date = new Date();
        var menit = "00";
        var jam = ""+date.getHours();
        var tanggal = ""+date.getDate();
        var bulan = ""+(date.getMonth()+1);
        var tahun = ""+date.getFullYear();
        if (jam.length == 1){
            jam = "0"+jam;
        }if (bulan.length == 1){
            bulan = "0"+bulan;
        }
        var all = '';
        switch (jumlahReturn) {
            case 'tahun':
                all = tahun; 
                break;
            case 'bulan':
                all = bulan; 
                break;
            case 'tanggal':
                all = tanggal; 
                break;
            case 'jam':
                all = jam; 
                break;
            case 'menit':
                all = menit; 
                break;
            case 'menit':
                all = tahun+""+bulan+""+tanggal+""+jam+""+menit;
                break;
        
            default:
                all = tahun+""+bulan+""+tanggal+""+jam+""+menit;
                break;
        }
        return all;
    }

    const weather_value = (weather = '', timerange = '') =>{
        var weather_val = '';
        var status;
        $(weather).find('timerange').each(function(){
            var weather_datetime = this.attributes['datetime'].value;
            if (weather_datetime == timerange){
                var tahun   = weather_datetime.substring(0,4);
                var bulan   = weather_datetime.substring(4, 6);
                var tanggal = weather_datetime.substring(6, 8);
                var jam     = weather_datetime.substring(8, 10);
                var menit   = weather_datetime.substring(10, 12);
                var weather_h  = this.attributes['h'].value;
                weather_val = this.children[0].firstChild.data;
            }else{
            }
        });
        switch (weather_val) {
            case "0":
                status = weather_val+";Cerah;fa-sun";
                break;
            case "1":
                status = weather_val+";Cerah Berawan;fa-cloud-sun";
                break;
            case "2":
                status = weather_val+";Cerah Berawan;fa-cloud-sun";
                break;
            case "3":
                status = weather_val+";Berawan;fa-cloud";
                break;
            case "4":
                status = weather_val+";Berawan Tebal;fa-clouds";
                break;
            case "5":
                status = weather_val+";Udara Kabut;fa-smog";
                break;
            case "10":
                status = weather_val+";Asap;fa-smog";
                break;
            case "45":
                status = weather_val+";Kabut;fa-smog";
                break;
            case "60":
                status = weather_val+";Hujan Ringan;fa-cloud-rain";
                break;
            case "61":
                status = weather_val+";Hujan Sedang;fa-cloud-rain";
                break;
            case "63":
                status = weather_val+";Hujan Lebat;fa-cloud-shower-heavy";
                break;
            case "80":
                status = weather_val+";Hujan Lokal;fa-cloud-rain";
                break;
            case "95":
                status = weather_val+";Hujan Petir;fa-poop-storm";
                break;
            case "97":
                status = weather_val+";Hujan Petir;fa-poop-storm";
                break;
        
            default:
                status = weather_val+";Cerah;fa-sun";
                break;
        }
        return status;
    }

    const renderAllBooks = (xml, namaDaerah) => {
        const listElement = $("#list");
        const optionElement = $("#searchElement");
        var contents = '';
        var content = `
        <option value="">Pilih Area</option>`;
        var parser =  new DOMParser();
        var xmlparse = parser.parseFromString(xml, "application/xml");
        $(xmlparse).find('area').each(function(){
            var $area       = $(this);
            var area        = $area.attr("description");
            var idarea      = $area[0].attributes['id'].value;
            var latitude    = $area[0].attributes['latitude'].value;
            var longitude   = $area[0].attributes['longitude'].value;
            var coordinate  = $area[0].attributes['coordinate'].value;
            var type_area   = $area[0].attributes['type'].value;
            var name_us     = $area[0].children[0];
            var name_id     = $area[0].children[1];
            if (idarea != '1100117'){
                content += `<option value="${area}">${area}</option>`;
            }
        
            if (idarea != '1100117' && area == namaDaerah){
                contents += `
                        <div class="col-md-12">
                            <h6><b>Area ${area}</b></h6>
                        </div>
                        `;
                var suhu        = $area[0].children[7];
                var weather     = $area[0].children[8];
                var block = 1;
                $(suhu).find('timerange').each(function(){
                    var suhu_datetime = this.attributes['datetime'].value;
                    var tahun   = suhu_datetime.substring(0,4);
                    var bulan   = suhu_datetime.substring(4, 6);
                    var tanggal = suhu_datetime.substring(6, 8);
                    var jam     = suhu_datetime.substring(8, 10);
                    var menit   = suhu_datetime.substring(10, 12);
                    if ((""+tahun+bulan+tanggal) == (""+getTime("tahun")+getTime("bulan")+getTime("tanggal")) && block < 4 && block == 1){
                        contents += `
                        <div class="col-md-12">
                            <h6>Hari ini</h6>
                        </div>`;
                    }
                    if ((""+tahun+bulan+tanggal) > (""+getTime("tahun")+getTime("bulan")+getTime("tanggal")) && block > 4 && block < 8 && block == 5){
                        contents += `
                        <div class="col-md-12">
                            <h6>Besok</h6>
                        </div>`;
                    }
                    if ((""+tahun+bulan+tanggal) > (""+getTime("tahun")+getTime("bulan")+getTime("tanggal")) && block > 8 && block < 12 && block == 9){
                        contents += `
                        <div class="col-md-12">
                            <h6>Lusa</h6>
                        </div>`;
                    }
                    var suhu_h  = this.attributes['h'].value;
                    var suhu_celcius = this.children[0].firstChild.data;
                    var weather_val = weather_value(weather, suhu_datetime);
                    weather_val = weather_val.split(";");
                    contents += `
                    <div class="col-md-3 col-12" style="padding: 10px">
                        <div class="card bg-secondary text-white p-3">
                            <div class="card-header">
                                <i class="fas ${weather_val[2]} text-warning"></i> 
                                ${area}
                                <span class="float-right">${suhu_celcius}&#8451;</span>
                            </div>
                            <div class="card-body">${weather_val[1]}</div>
                            <div class="card-footer">
                                <span class="small float-right"> 
                                    <i class="fas fa-clock"></i> 
                                    ${jam}:${menit}:00 &nbsp;
                                    <i class="fas fa-calendar"></i> 
                                    ${tanggal}-${bulan}-${tahun}
                                </span>
                            </div>
                        </div>
                    </div>
                    `;
                    block++;
                });
        
            }else if(idarea != '1100117' && namaDaerah == ''){
                contents += `
                        <div class="col-md-12">
                            <h6><b>Area ${area}</b></h6>
                        </div>
                        `;
                var suhu        = $area[0].children[7];
                var weather     = $area[0].children[8];
                var block = 1;
                $(suhu).find('timerange').each(function(){
                    var suhu_datetime = this.attributes['datetime'].value;
                    var tahun   = suhu_datetime.substring(0,4);
                    var bulan   = suhu_datetime.substring(4, 6);
                    var tanggal = suhu_datetime.substring(6, 8);
                    var jam     = suhu_datetime.substring(8, 10);
                    var menit   = suhu_datetime.substring(10, 12);
                    if ((""+tahun+bulan+tanggal) == (""+getTime("tahun")+getTime("bulan")+getTime("tanggal")) && block < 4 && block == 1){
                        contents += `
                        <div class="col-md-12">
                            <h6>Hari ini</h6>
                        </div>`;
                    }
                    if ((""+tahun+bulan+tanggal) > (""+getTime("tahun")+getTime("bulan")+getTime("tanggal")) && block > 4 && block < 8 && block == 5){
                        contents += `
                        <div class="col-md-12">
                            <h6>Besok</h6>
                        </div>`;
                    }
                    if ((""+tahun+bulan+tanggal) > (""+getTime("tahun")+getTime("bulan")+getTime("tanggal")) && block > 8 && block < 12 && block == 9){
                        contents += `
                        <div class="col-md-12">
                            <h6>Lusa</h6>
                        </div>`;
                    }
                    var suhu_h  = this.attributes['h'].value;
                    var suhu_celcius = this.children[0].firstChild.data;
                    var weather_val = weather_value(weather, suhu_datetime);
                    weather_val = weather_val.split(";");
                    contents += `
                    <div class="col-md-3 col-12" style="padding: 10px">
                        <div class="card bg-secondary text-white p-3">
                            <div class="card-header">
                                <i class="fas ${weather_val[2]} text-warning"></i> 
                                ${area}
                                <span class="float-right">${suhu_celcius}&#8451;</span>
                            </div>
                            <div class="card-body">${weather_val[1]}</div>
                            <div class="card-footer">
                                <span class="small float-right"> 
                                    <i class="fas fa-clock"></i> 
                                    ${jam}:${menit}:00 &nbsp;
                                    <i class="fas fa-calendar"></i> 
                                    ${tanggal}-${bulan}-${tahun}
                                </span>
                            </div>
                        </div>
                    </div>
                    `;
                    block++;
                });
                
            }
        });
        listElement.html(contents); 
        optionElement.html(content);
    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {

        const keyword = document.querySelector("#searchElement");
        const buttonSearch = document.querySelector("#buttonSearch");

        buttonSearch.addEventListener("click", function () {
            getData(keyword.value);
            keyword.innerHTML += `<option value="${keyword.value}" selected>${keyword.value}</option>`;
        });
        getData();
    });
}

export default main;
