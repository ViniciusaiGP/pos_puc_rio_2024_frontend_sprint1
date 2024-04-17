window.onload = function () {
    function isLogin() {
        var login_UID = localStorage.getItem('login');
        document.getElementById('userNameMenu').textContent = login_UID;
    }
    isLogin();
    showHome();
};

function showHome() {
    document.getElementById('homeContent').classList.remove('hidden');
    document.getElementById('loginContent').classList.add('hidden');
    document.getElementById('loginContent').classList.add('hidden');
    document.getElementById('registerContent').classList.add('hidden');
    document.getElementById('logoutContent').classList.add('hidden');
    document.getElementById('qrcodeContent').classList.add('hidden');
    document.getElementById('cadOfProductsContent').classList.add('hidden');
    document.getElementById('listOfProductsContent').classList.add('hidden');
    document.querySelector('.sidebar a.active').classList.remove('active');
    document.querySelector('.sidebar a[href="#home"]').classList.add('active');
}

function showLogin() {
    document.getElementById('homeContent').classList.add('hidden');
    document.getElementById('loginContent').classList.remove('hidden');
    document.getElementById('registerContent').classList.add('hidden');
    document.getElementById('logoutContent').classList.add('hidden');
    document.getElementById('qrcodeContent').classList.add('hidden');
    document.getElementById('cadOfProductsContent').classList.add('hidden');
    document.getElementById('listOfProductsContent').classList.add('hidden');
    document.querySelector('.sidebar a.active').classList.remove('active');
    document.querySelector('.sidebar a[href="#login"]').classList.add('active');
}

function showRegister() {
    document.getElementById('homeContent').classList.add('hidden');
    document.getElementById('loginContent').classList.add('hidden');
    document.getElementById('registerContent').classList.remove('hidden');
    document.getElementById('logoutContent').classList.add('hidden');
    document.getElementById('qrcodeContent').classList.add('hidden');
    document.getElementById('cadOfProductsContent').classList.add('hidden');
    document.getElementById('listOfProductsContent').classList.add('hidden');
    document.querySelector('.sidebar a.active').classList.remove('active');
    document.querySelector('.sidebar a[href="#register"]').classList.add('active');
}

function showLogout() {
    document.getElementById('homeContent').classList.add('hidden');
    document.getElementById('loginContent').classList.add('hidden');
    document.getElementById('registerContent').classList.add('hidden');
    document.getElementById('logoutContent').classList.remove('hidden');
    document.getElementById('qrcodeContent').classList.add('hidden');
    document.getElementById('cadOfProductsContent').classList.add('hidden');
    document.getElementById('listOfProductsContent').classList.add('hidden');
    document.querySelector('.sidebar a.active').classList.remove('active');
    document.querySelector('.sidebar a[href="#logout"]').classList.add('active');
    submitLogout();
}

function showQRCode() {
    document.getElementById('homeContent').classList.add('hidden');
    document.getElementById('loginContent').classList.add('hidden');
    document.getElementById('registerContent').classList.add('hidden');
    document.getElementById('logoutContent').classList.add('hidden');
    document.getElementById('cadOfProductsContent').classList.add('hidden');
    document.getElementById('qrcodeContent').classList.remove('hidden');
    document.getElementById('listOfProductsContent').classList.add('hidden');
    document.querySelector('.sidebar a.active').classList.remove('active');
    document.querySelector('.sidebar a[href="#qrcode"]').classList.add('active');
}

function showListOfProducts() {
    document.getElementById('homeContent').classList.add('hidden');
    document.getElementById('loginContent').classList.add('hidden');
    document.getElementById('registerContent').classList.add('hidden');
    document.getElementById('qrcodeContent').classList.add('hidden');
    document.getElementById('logoutContent').classList.add('hidden');
    document.getElementById('cadOfProductsContent').classList.add('hidden');
    document.getElementById('listOfProductsContent').classList.remove('hidden');
    document.querySelector('.sidebar a.active').classList.remove('active');
    document.querySelector('.sidebar a[href="#list_prod"]').classList.add('active');
    fetchProducts();
}

function showCadOfProducts() {
    document.getElementById('homeContent').classList.add('hidden');
    document.getElementById('loginContent').classList.add('hidden');
    document.getElementById('registerContent').classList.add('hidden');
    document.getElementById('logoutContent').classList.add('hidden');
    document.getElementById('qrcodeContent').classList.add('hidden');
    document.getElementById('listOfProductsContent').classList.add('hidden');
    document.getElementById('cadOfProductsContent').classList.remove('hidden');
    document.querySelector('.sidebar a.active').classList.remove('active');
    document.querySelector('.sidebar a[href="#cad_prod"]').classList.add('active');
}

function isLogin() {
    var login_UID = localStorage.getItem('login');
    document.getElementById('userNameMenu').textContent = login_UID;
}

function submitRegister() {
    var emailRe = document.getElementById('emailReInput').value;
    var loginRe = document.getElementById('loginReInput').value;
    var senhaRe = document.getElementById('passwordReInput').value;

    axios.post('http://localhost:5000/registrar',
        { email: emailRe, login: loginRe, senha: senhaRe })
        .then(function (response) {
            var token = response.data.access_token;
            var savedLogin = response.data.login;

            localStorage.setItem('token', token);
            localStorage.setItem('login', savedLogin);
            var token_UID = localStorage.getItem('token');
            var login_UID = localStorage.getItem('login');

            if (token_UID && login_UID) {
                document.getElementById('userNameMenu').textContent = login_UID;
                alert("Cadastrado com sucesso!");
            } else {
                alert("Token ou login não encontrados no localStorage.");
            }
        })
        .catch(function (error) {
            if (error.response && error.response.status === 400) {
                alert('Erro 400: E-mail ou login já está em uso.');
            }
        });
}

function submitLogin() {
    var login = document.getElementById('loginInput').value;
    var senha = document.getElementById('passwordInput').value;

    axios.post('http://localhost:5000/login',
        { login: login, senha: senha })
        .then(function (response) {

            var token = response.data.access_token;
            var savedLogin = response.data.login;
            localStorage.setItem('token', token);
            localStorage.setItem('login', savedLogin);

            var token_UID = localStorage.getItem('token');
            var login_UID = localStorage.getItem('login');

            if (token_UID && login_UID) {
                document.getElementById('userNameMenu').textContent = login_UID;
                alert("Conta autenticada com sucesso!");
            } else {
                alert("Crie uma conta!");
            }
        })
        .catch(function (error) {
            alert("Aconteceu um erro: preencha os campos!");
        });
}

function submitQRCode() {
    var notaUrl = document.getElementById('QRCodeInput').value;
    var token_UID = localStorage.getItem('token');

    if (token_UID) {
        var headers = {
            'Authorization': 'Bearer ' + token_UID
        };

        axios.post('http://localhost:5000/nota_url', { nota_url: notaUrl }, { headers: headers })
            .then(function (response) {

                if (response && response.data) {
                    var empresa = response.data.Empresa;
                    var informacoesPagamento = response.data["Informações de Pagamento"];
                    var itens = response.data.Itens;

                    itens.forEach(function (item) {
                        var vlTotal = parseFloat(item["Vl. Total"].replace(',', '.'));
                        var vlUnit = parseFloat(item["Vl. Unit."].replace(',', '.'));

                        axios.post('http://localhost:5000/produto',
                            {
                                produto: item["Produto"],
                                qtde: parseInt(item["Qtde"]),
                                un: item["UN"],
                                vl_total: vlTotal,
                                vl_unit: vlUnit
                            },
                            { headers: headers })
                            .then(function (response) {
                                alert("Item cadastrado com sucesso!");
                            })
                            .catch(function (error) {
                                alert("Aconteceu um erro:" + error);
                            });
                    });
                } else {
                    alert("Resposta inválida do servidor.");
                }
            })
            .catch(function (error) {
                alert("Aconteceu um erro:" + error);
            });

    } else {
        alert("Efetue o Login ou crie uma conta!");
    }
}

function submitLogout() {
    var token_UID = localStorage.getItem('token');

    if (token_UID) {
        var headers = {
            'Authorization': 'Bearer ' + token_UID
        };

        axios.post('http://localhost:5000/logout', {}, { headers: headers })
            .then(function (response) {
                localStorage.removeItem('token');
                localStorage.removeItem('login');
                document.getElementById('userNameMenu').textContent = "";
                alert("Desconectado, token foi removido da sessão!");
            })
            .catch(function (error) {
                alert("Aconteceu um erro:" + error);
            });
    } else {
        alert("Efetue o Login ou crie uma conta para essa ação!");
    }
}

function submitRegisterProduct() {
    var nomeProdutoRe = document.getElementById('nomeProdutoReInput').value;
    var qtdeRe = document.getElementById('qtdeReInput').value;
    var unRe = document.getElementById('unReInput').value;
    var vlUnitRe = document.getElementById('vlUnitReInput').value;
    var vlTotalRe = document.getElementById('vlTotalReInput').value;
    var token_UID = localStorage.getItem('token');

    if (token_UID) {
        var headers = {
            'Authorization': 'Bearer ' + token_UID
        };

        axios.post('http://localhost:5000/produto',
            { produto: nomeProdutoRe, qtde: qtdeRe, un: unRe, vl_total: vlTotalRe, vl_unit: vlUnitRe },
            { headers: headers })
            .then(function (response) {
                alert("Produto cadastrado com sucesso!");
            })
            .catch(function (error) {
                alert("Aconteceu um erro:" + error);
            });
    } else {
        alert("Efetue o Login ou crie uma conta!");
    }
}

function fetchProducts() {
    var token_UID = localStorage.getItem('token');

    if (token_UID) {
        var headers = {
            'Authorization': 'Bearer ' + token_UID
        };

        axios.get('http://localhost:5000/produtos', { headers: headers })
            .then(function (response) {
                if (response.data && response.data.Produtos) {

                    const tableBody = document.getElementById('productTableBody');
                    tableBody.innerHTML = '';
                    response.data.Produtos.forEach(function (produto) {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                                <td>${produto.produto}</td>
                                <td>${produto.qtde}</td>
                                <td>${produto.un}</td>
                                <td>${produto.vl_unit}</td>
                                <td>${produto.vl_total}</td>
                              `;
                        tableBody.appendChild(row);
                    });
                } else {
                    alert("Resposta inválida do servidor:" + response);
                }
            })
            .catch(function (error) {
                alert("Erro ao buscar produtos:" + error);
            });
    } else {
        alert("Efetue o Login ou crie uma conta!");
    }
}