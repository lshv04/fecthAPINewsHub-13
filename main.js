const apiKey = 'c6d4a244596e4be0a40ccfdce20659e1';
const pageSize = 5; // Número máximo de artigos a retornar

// Função para fazer a requisição para uma categoria específica
function fetchNewsByCategory(category) {
  const url = `https://newsapi.org/v2/top-headlines?country=br&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const articles = data.articles;
      const container = document.querySelector(`#${category}Container`);

      // Função para criar HTML para uma notícia
      function createArticleHTML(article) {
        const date = new Date(article.publishedAt).toLocaleDateString('pt-BR');
        return `
       <div class="col-12  headline ">
          <div>
            <div class="autor ">
              <p class="autorname">${article.author}</p> <!-- Nome da fonte -->
              <p>${date}</p>
            </div>
            <h2 >
              <a href="${article.url}" target="_blank" >${article.title}</a>
            </h2>
          </div>
        </div>
        `;
      }

      // Adiciona o HTML ao contêiner específico da categoria
      articles.forEach(article => {
        container.innerHTML += createArticleHTML(article);
      });
    })
    .catch(error => console.error('Error:', error));
}

// Chamar a função para cada categoria
const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
categories.forEach(category => fetchNewsByCategory(category));



