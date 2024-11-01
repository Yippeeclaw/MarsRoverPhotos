let imagen = document.getElementById("foto");
let p_id = document.getElementById("id_imagen");
let p_martian = document.getElementById("martian");
let p_fecha = document.getElementById("fecha");
let page = 1;
let data;

document.getElementById("input_fecha").value = "2015-07-02";
let date = document.getElementById("input_fecha").value;

function obtenerFecha() {
    date = document.getElementById("input_fecha").value;
    return date;
}

function establecerDetalles(id) {
    imagen.src = data.photos[id].img_src;
    p_id.textContent = data.photos[id].id;
    p_martian.textContent = data.photos[id].sol;
    p_fecha.textContent = data.photos[id].earth_date;
}

function generarInfo() {
    const tableHead = document.querySelector('#tablaInfo thead');
    let cabeza = `
                <tr>
                    <th>ID</th>
                    <th>Rover Name</th>
                    <th>Camera</th>
                    <th>Details</th>
                </tr>
        `;
    tableHead.innerHTML = cabeza;
    const tableBody = document.querySelector('#tablaInfo tbody');
    tableBody.innerHTML = '';

    establecerDetalles(0);
    
    let rows = "";
    let i = 0;
    data.photos.forEach((foto) => {
        rows += `
                <tr>
                    <td>${foto.id}</td>
                    <td>${foto.rover.name}</td>
                    <td>${foto.camera.name}</td>
                    <td><input id="${i++}" type="submit" value="More" onclick="establecerDetalles(this.id)"</td>
                </tr>
        `;
        tableBody.innerHTML = rows;
    });
}

function siguientePagina() {
    document.getElementById("btn_anterior").disabled = false;
    sumPage();
    obtenerInfo(date, page);
}

function anteriorPagina() {
    if (page == 2) {
        document.getElementById("btn_anterior").disabled = true;
        restarPage();
        obtenerInfo(date, page);
    } else {
        restarPage();
        obtenerInfo(date, page);
    }
}

function sumPage() {
    page++;
}

function restarPage() {
    page--;
}

async function obtenerInfo(fecha, numPagina) {
    response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=DEMO_KEY&earth_date=${fecha}&page=${numPagina}`)
    data = await response.json();
    generarInfo();
}

async function buscarInfo() {
    document.getElementById("btn_anterior").disabled = true;
    page = 1;
    await obtenerInfo(obtenerFecha(), 1);
    console.log(data.photos.length);
    if (data.photos.length < 25) {
        document.getElementById("btn_siguiente").disabled = true;
    }
}

window.onload = function() {
    obtenerInfo("2015-07-02", 1);
}
