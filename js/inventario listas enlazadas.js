let Producto=function(id, nombre, cantidad, precio)
  {
    this.id=id;
    this.nombre=nombre;
    this.cantidad = cantidad;
    this.precio = precio;
    this.siguiente=null;
    this.anterior=null;
    this.infoHtml=function()
        {
            return  "<div><h2>" + "Código: " + this.id +"</h2>" +
                    "<h3>" + "Nombre: " + this.nombre + "</h3>" + 
                    "<h4>" + "Cantidad: " + this.cantidad + "</h4>" +
                    "<p>" + "Precio: " + this.precio + "</p>" + 
                    "</div>"
        }
  };

let Control=function()
  { 
    this.inicio=null;
  
    this.agregar=function(nuevo)
    {
      if (this.inicio==null)
        this.inicio=nuevo;
      else
      {
        if(this.inicio.id<nuevo.id && this.inicio.siguiente==null)
        {
          this.inicio.siguiente=nuevo;
          nuevo.anterior=this.inicio;

        }
        else
        {
          if(this.inicio.id>nuevo.id)
          {
            this.inicio.anterior=nuevo;
            nuevo.siguiente=this.inicio;
            this.inicio=nuevo;
            return true;
          }
          else
          {
            let t=this.inicio;
            while(t.siguiente!=null)
              if(t.id>nuevo.id)
              {
                nuevo.siguiente=t;
                nuevo.anterior=t.anterior;
                t.anterior.siguiente=nuevo;
                t.anterior=nuevo;
                return true;
              }
              else
              {
                t=t.siguiente;
                if(t.siguiente==null)
                {
                t.siguiente=nuevo;
                nuevo.anterior=t;
                return true;
                }
              }
            }   
        } 
      }
    console.log(nuevo);
    }

    this.buscar=function(id)
    {
      let t=this.inicio;
        while(t!=null && t.id!=id)
        {
	        t=t.siguiente;
        }
          return t;   
    }
    

    this.listar=function()
    {
      let res=""; 
      let t=this.inicio;
      while(t!=null)
      {
        res+= t.infoHtml() + "<br>";
        t=t.siguiente;
      }
        return res; 
    }

    this.eliminar = function (id)
    { 
      let vacio="";
      if(vacio==id)
      {
        return false;
      }
      else
      {
        if (this.inicio.id==id)
        {
          this.inicio=this.inicio.siguiente;
          this.inicio.anterior=null;
        }
        else
        {
              let t=this.inicio;
              while(t.siguiente!=null)
                if (t.id==id)
                {
                  t.siguiente.anterior=t.anterior;
                  t.anterior.siguiente=t.siguiente;
                  return true;
                }
                else
                  {
                    t=t.siguiente;
                    if(t.siguiente==null)
                    {
                      t=t.anterior;
                      t.siguiente=null;
                      return true;
                    }
                  }
        return false;
        }
      }
    }  
  };

  
  let inventario=new Control();

let btnNuevo=document.getElementById('btnNuevo');
btnNuevo.addEventListener('click',()=>{
        let id, nombre, cantidad, precio;
        id=document.getElementById('IntroId').value;
        nombre=document.getElementById('IntroNombre').value;
        cantidad=document.getElementById('IntroCantidad').value;
        precio=document.getElementById('IntroPrecio').value;
        let producto=new Producto(id,nombre,cantidad,precio);
        inventario.agregar(producto);
        document.getElementById('IntroId').value="";
        document.getElementById('IntroNombre').value="";
        document.getElementById('IntroCantidad').value="";
        document.getElementById('IntroPrecio').value="";
        console.log("Se agrego el producto " + "-" + producto.nombre); 
});

let btnBuscar=document.getElementById('btnBuscar');
btnBuscar.addEventListener('click',()=>{
    let codigo=document.getElementById('IntroId').value;
    let buscado=inventario.buscar(codigo);
    let res=document.getElementById('resultado');
    if (buscado==null)
    {
        document.getElementById('resultado').innerHTML=" ";
        res.innerHTML += "<h2>No se encontro en la busqueda</h2>" 
    }
    else
    {
        document.getElementById('resultado').innerHTML=" ";
        res.innerHTML += "<h2>Si se encontro el producto</h2>" + buscado.infoHtml();
    }  
});

  let btnEliminar=document.getElementById('btnEliminar');
  btnEliminar.addEventListener('click',()=>{
      let codigo=document.getElementById('IntroId').value;
      let eliminado=inventario.eliminar(codigo);
      let res=document.getElementById('resultado');
      if (eliminado==false)
      {
          document.getElementById('resultado').innerHTML=" ";
          res.innerHTML += "<h2>el Producto no existe o ya se elimino</h2>" 
      }
      else
      {
          document.getElementById('resultado').innerHTML=" ";
          res.innerHTML += "<h2>Se elimino Correctamente el Producto</h2>";
      }
  });

let btnListar=document.getElementById('btnListar');
btnListar.addEventListener('click',()=>{
    document.getElementById('resultado').innerHTML=" ";
    let res=document.getElementById('resultado');
    res.innerHTML+="<h2>Listado de Productos</h2>" + inventario.listar();
});