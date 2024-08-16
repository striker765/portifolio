from flask import Flask, request, render_template
from flask_mail import Mail, Message

# Criação da aplicação Flask
app = Flask(__name__)

# Configuração do Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.office365.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = ''
app.config['MAIL_PASSWORD'] = ''
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)

# Rota para exibir o formulário de contato
@app.route('/')
def index():
    return render_template('index.html')

# Rota para processar o envio do e-mail
@app.route('/enviar-email', methods=['POST'])
def enviar_email():
    nome = request.form['nome']
    email = request.form['email']
    mensagem = request.form['mensagem']

    msg = Message('Contato - Formulário de ' + nome,
                  sender=email,
                  recipients=['thiago-carvalho789@outlook.com'])
    msg.body = f'Nome: {nome}\nEmail: {email}\nMensagem: {mensagem}'

    try:
        mail.send(msg)
        return 'Email enviado com sucesso'
    except Exception as e:
        return f'Ocorreu um erro: {str(e)}'

if __name__ == '__main__':
    app.run(debug=True)
