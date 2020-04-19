class NavBar extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
        <link href="../node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css" rel="stylesheet">
        <link href="../node_modules/@fortawesome/fontawesome-free/css/brands.css" rel="stylesheet">
        <link href="../node_modules/@fortawesome/fontawesome-free/css/solid.css" rel="stylesheet">
        
        <script src='../node_modules/jquery/dist/jquery.js'></script> 
        
        <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <a class="navbar-brand" href="./"><i class="fas fa-cloud-sun text-warning"></i> CUACA</a>
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link float-right" href="./">Home <span class="sr-only">(current)</span></a>
                </li>
            </ul>
        </nav>
        `;
    }
}

customElements.define("nav-bar", NavBar);