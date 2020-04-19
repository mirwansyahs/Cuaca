class FooTer extends HTMLElement {

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
        <link href="../node_modules/@fortawesome/fontawesome-free/css/solid.css" rel="stylesheet"><script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        
        <script src='../node_modules/jquery/dist/jquery.js'></script> 
        
        <footer class="page-footer font-small">

            <div class="footer-copyright text-center py-3">&copy; 2020 Copyright -
                <a href="https://github.com/mirwansyahs" target="_BLANK"> M Irwansyah S</a>
                 DataSource by 
                <a href="https://data.bmkg.go.id/prakiraan-cuaca/" target="_BLANK">bmkg.go.id</a>
            </div>

        </footer>
        `;
    }
}

customElements.define("foo-ter", FooTer);