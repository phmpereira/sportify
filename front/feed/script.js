const profileText = document.querySelector('#profile_text')
const profile = document.querySelector('.profile')
const profileOption = document.querySelector('.profile-option')
const container = document.querySelector('.container-main')

const toast = document.querySelector('.toast')
const toastText = document.querySelector('.toast-text')
const toastTimer = document.querySelector('.toast-timer')

window.document.addEventListener('DOMContentLoaded', () => {
   if(localStorage.getItem('name_user')){
      profileText.innerHTML = `${localStorage.getItem('name_user')}`
   }else{
      window.location.href = '../index.html'
   }

   load_posts()
})

profile.addEventListener('click', () => {
   if(getComputedStyle(profileOption).display == 'none'){
      profileOption.style.display = 'block'
   }else{
      profileOption.style.display = 'none'
   }
   
})

const load_posts = () => {
   const xhr = new XMLHttpRequest
   xhr.open('GET', 'http://localhost:3000/posts', true)

   xhr.onload = () => {
      if (xhr.status === 200) {
         const res = JSON.parse(xhr.responseText)
         res.forEach(data => {
            container.innerHTML += `
                                 <div class="post">
                                    <div class="post-owner">
                                       <p><strong>${data.name_user}</strong></p>
                                       <br>
                                       <p>${data.dt_post}</p>
                                    </div>
                                    <h3 class="post-title">${data.title}</h3>
                                    <div class="post-content">
                                       <p>${data.description}</p>
                                    </div>
                                    <div class="comments-section">
                                       <h2>Comentários</h2>
                                       <div class="comment">
                                          <p><strong>Usuário 1:</strong> Este é um comentário interessante!</p>
                                       </div>
                                       <div class="comment">
                                          <p><strong>Usuário 2:</strong> Concordo com o que foi dito!</p>
                                       </div>
                                       <form class="comment-form">
                                          <textarea placeholder="Deixe seu comentário..." required></textarea>
                                          <button onclick='comment(${data.id_post})'>Comentar</button>
                                       </form>
                                    </div>
                                 </div>
                              `
         })
      }
   }  

   xhr.send()
}

const add_post = () => {
   let postTitle = ipt_title.value
   let postDescription = ipt_description.value
   
   const xhr = new XMLHttpRequest
   xhr.open('POST', 'http://localhost:3000/posts', true)
   xhr.setRequestHeader('Content-Type', 'application/json')

   xhr.onload = () => {
      if (xhr.status === 200) {
         const res = JSON.parse(xhr.responseText)
         ipt_title.value = ''
         ipt_description.value = ''
         show_toast('Post inserido com sucesso', 'success')
      } else {
         show_toast('Erro ao inserir post', 'error')
      }
   }

   const data = JSON.stringify({
      title: postTitle,
      description: postDescription,
      id_user: parseInt(localStorage.getItem('user_id'))
   })

   xhr.send(data)
}

const comment = (post_id) => {
   console.log(post_id)
}

const show_toast = (text, color) => {
   toast.classList.add('show')
   toastText.innerText = text
   toastTimer.style.backgroundColor = `var(--${color})`

   setTimeout(() => toast.classList.remove('show'), 3000)
}

const logout = () => {
   localStorage.clear()
   window.location.href = '../index.html'
}