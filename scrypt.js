// script.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('entradas/lista.json')
        .then(res => {
            if (!res.ok) throw new Error('No se pudo cargar la lista de artículos');
            return res.json();
        })
        .then(articulos => {
            const contenedor = document.getElementById('lista-articulos');
            if (!contenedor) {
                console.warn('No se encontró el contenedor #lista-articulos');
                return;
            }
            
            // Ordenar por fecha (más reciente primero)
            articulos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            
            const html = articulos.map(a => `
                <article class="post-preview">
                    <h2><a href="entradas/${a.archivo}">${a.titulo}</a></h2>
                    <p class="resumen">${a.resumen}</p>
                    <small class="fecha">📅 ${formatearFecha(a.fecha)}</small>
                    ${a.etiquetas ? `<div class="etiquetas">${a.etiquetas.map(t => `<span class="etiqueta">#${t}</span>`).join(' ')}</div>` : ''}
                </article>
            `).join('');
            
            contenedor.innerHTML = html;
        })
        .catch(error => {
            console.error('Error:', error);
            const contenedor = document.getElementById('lista-articulos');
            if (contenedor) {
                contenedor.innerHTML = '<p>⚠️ No se pudieron cargar los artículos. Intenta más tarde.</p>';
            }
        });
});

function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones);
}