const formCadastro = document.querySelector('.form-cadastro')
const formLogin = document.querySelector('.form-login')
const spanErroCadastro = document.getElementById('error-cadastro')

let passwordLength = false
let passwordUpper = false
let passwordLower = false
let passwordSpecial = false
let passwordNumber = false

formCadastro.addEventListener('submit', (e) => {
   e.preventDefault()
   console.log('entrou aq')

   if(passwordLength && passwordLower && passwordSpecial && passwordNumber && passwordUpper){
      toggleErrorCadastro('none', 'hidden', '')

      if(ipt_second_name.value == '' || ipt_second_name.value == undefined || ipt_name.value == '' || ipt_name.value == undefined || ipt_email.value == '' || ipt_email.value == undefined || ipt_username.value == '' || ipt_username.value == undefined){
         toggleErrorCadastro('block', 'visible', 'Todos os campos devem estar devidamente preenchidos ')
      }else{
         toggleErrorCadastro('none', 'hidden', '')
         redirect_to()
      }
      
      
   }else{
      toggleErrorCadastro('block', 'visible', 'A senha deve atender aos requisitos mínimos<br>')
   }
})

const toggleErrorCadastro = (display, visibility, msg) => {
   spanErroCadastro.style.display = display
   spanErroCadastro.style.visibility = visibility
   spanErroCadastro.innerHTML = msg
}

const show_form = (show, hide) => {
   let formShow = document.querySelector(`.form-${show}`)
   let formHide = document.querySelector(`.form-${hide}`)

   formShow.style.display = 'flex'
   formShow.style.visibility = 'visible'
   formHide.style.display = 'none'
   formHide.style.visibility = 'hidden'   
}

const verify_password = () => {
   let password = document.getElementById('ipt_c_password')
   let confPassword = document.getElementById('ipt_conf_password')

   if(!(password.value == confPassword.value)) {
      password.style.border = '1px solid var(--error)'
      password.style.color = 'var(--error)'

      confPassword.style.border = '1px solid var(--error)'
      confPassword.style.color = 'var(--error)'

      // toggleErrorCadastro('block', 'visible', 'As senhas devem ser iguais')
   }else{
      password.style.border = 'none'
      password.style.color = 'var(--dark-gray)'

      confPassword.style.border = 'none'
      confPassword.style.color = 'var(--dark-gray)'

      // toggleErrorCadastro('none', 'hidden', '')
   }
}

const verify_requirements = () => {
   let password = document.getElementById('ipt_c_password')

   if(password.value.match(/[0-9]/)){
      span_number.style.color = `var(--light-primary-color)`
      passwordNumber = true
   }else{
      span_number.style.color = `var(--error)`
      passwordNumber = false
   }

   if(password.value.match(/[a-z]/)){
      span_lower.style.color = `var(--light-primary-color)`
      passwordLower = true
   }else{
      span_lower.style.color = `var(--error)`
      passwordLower = false
   }

   if(password.value.match(/[A-Z]/)){
      span_upper.style.color = `var(--light-primary-color)`
      passwordUpper = true
   }else{
      span_upper.style.color = `var(--error)`
      passwordUpper = false
   }

   if(password.value.length >= 8){
      span_length.style.color = `var(--light-primary-color)`
      passwordLength = true
   }else{
      span_length.style.color = `var(--error)`
      passwordLength = false
   }

   if(password.value.match(/[@#$&!_]/)){
      span_special.style.color = `var(--light-primary-color)`
      passwordSpecial = true
   }else{
      span_special.style.color = `var(--error)`
      passwordSpecial = false
   }
}