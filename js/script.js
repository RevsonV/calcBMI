var dadosTabela = [
    ["Classificação", "Homem", "Mulher"],
    ["Obesidade mórbida", ">= 40 kg/m²", ">= 39 kg/m²"],
    ["Obesidade moderada", "de 30 kg/m² a 39,9 kg/m²", "de 29 kg/m² a 38,9 kg/m²"],
    ["Obesidade leve", "de 25 kg/m² a 29,9 kg/m²", "de 24 kg/m² a 28,9 kg/m²"],
    ["Normal", "de 20 kg/m² a 24,9 kg/m²", "de 19 kg/m² a 23,9 kg/m²"],
    ["Abaixo do peso", "< 20 kg/m²", "< 19 kg/m²"]
]

function criarTag(TagPai, nomeTag, atributo, valor) {
    let elementoPai = document.getElementById(TagPai); //Pega o elemento pelo id passado no parâmetro
    let elementoFilho = document.createElement(nomeTag); //Cria o elemento passado no parâmetro

    if (atributo == "" && valor == "") { //Se o nome do atributo e valor não forem passados no parâmetro
        elementoPai.appendChild(elementoFilho); //Anexa o elemento criado no elemento escolhido
    } else { //Caso contrário
        elementoPai.appendChild(elementoFilho); //Anexa o elemento criado no elemento escolhido e
        elementoFilho.setAttribute(atributo, valor); //Define um atributo e um valor a este, conforme passado no parâmetro
    }
    
}

function inserirTabela() {
    //Cria a tabela do IMC
    criarTag("caixa-resultado", "table", "id", "tabela");

    //Cria o cabeçalho
    criarTag("tabela", "thead", "id", "cabecalho");

    //Cria as colunas de título
    criarTag("cabecalho", "td", "id", "classificacao");
    criarTag("cabecalho", "td", "id", "homem");
    criarTag("cabecalho", "td", "id", "mulher");
    //Input dos dados na linha de título
    document.getElementById("classificacao").append(dadosTabela[0][0]);
    document.getElementById("homem").append(dadosTabela[0][1]);
    document.getElementById("mulher").append(dadosTabela[0][2]);

    //Cria as linhas de dados
    criarTag("tabela", "tr", "id", "obs-morbid");
    criarTag("tabela", "tr", "id", "obs-moder");
    criarTag("tabela", "tr", "id", "obs-leve");
    criarTag("tabela", "tr", "id", "normal");
    criarTag("tabela", "tr", "id", "abaixo");

    //Cria linhas
    criarTag("obs-morbid", "td", "id", "morbid");
    criarTag("obs-morbid", "td", "id", ">=40");
    criarTag("obs-morbid", "td", "id", ">=39");
    criarTag("obs-moder", "td", "id", "moder");
    criarTag("obs-moder", "td", "id", "30a39");
    criarTag("obs-moder", "td", "id", "29a38");
    criarTag("obs-leve", "td", "id", "leve");
    criarTag("obs-leve", "td", "id", "25a29");
    criarTag("obs-leve", "td", "id", "24a28");
    criarTag("normal", "td", "id", "normal2");
    criarTag("normal", "td", "id", "20a24");
    criarTag("normal", "td", "id", "19a23");
    criarTag("abaixo", "td", "id", "abaixo2");
    criarTag("abaixo", "td", "id", "<20");
    criarTag("abaixo", "td", "id", "<19");

    //Inputs
    document.getElementById("morbid").append(dadosTabela[1][0]);
    document.getElementById(">=40").append(dadosTabela[1][1]);
    document.getElementById(">=39").append(dadosTabela[1][2]);
    document.getElementById("moder").append(dadosTabela[2][0]);
    document.getElementById("30a39").append(dadosTabela[2][1]);
    document.getElementById("29a38").append(dadosTabela[2][2]);
    document.getElementById("leve").append(dadosTabela[3][0]);
    document.getElementById("25a29").append(dadosTabela[3][1]);
    document.getElementById("24a28").append(dadosTabela[3][2]);
    document.getElementById("normal2").append(dadosTabela[4][0]);
    document.getElementById("20a24").append(dadosTabela[4][1]);
    document.getElementById("19a23").append(dadosTabela[4][2]);
    document.getElementById("abaixo2").append(dadosTabela[5][0]);
    document.getElementById("<20").append(dadosTabela[5][1]);
    document.getElementById("<19").append(dadosTabela[5][2]);

}

function remover(id) {
    var myobj = document.getElementById(id);

    try {
        myobj.remove();
    } catch (error) {
        
    }
}

function calcularIMC() {
    remover("caixa-resultado");

    //Os campos do formulário vão para suas respectivas variáveis
    let usrNome = document.getElementById("nomeUsuario").value;
    let usrSexo = document.getElementById("sexo").value;
    let usrAltura = document.getElementById("altura").value;
    let usrPeso = document.getElementById("peso").value;

    //Os valores das variáveis são jogados num objeto
    let usrInfo = {
        "nome": usrNome,
        "sexo": usrSexo,
        "altura": usrAltura.replace(",", "."),
        "peso": usrPeso.replace(",", ".")
    };
    
    //Apaga preenchimentos no documento
    document.getElementById("nomeUsuario").value = "";
    document.getElementById("sexo").value = "Selecionar";
    document.getElementById("altura").value = "";
    document.getElementById("peso").value = "";

    //Converte as strings do objeto (peso e altura) em números decimais
    usrPeso = parseFloat(usrInfo.peso);
    usrAltura = parseFloat(usrInfo.altura);

    let calcIMC = usrPeso / (usrAltura * usrAltura); //Calcula o IMC
    let calcIMC1 = calcIMC.toFixed(1); //Limita para uma casa decimal
    let calcIMC2 = calcIMC1.toString(); //Converte para string novamente
    let calcIMC3 = calcIMC2.replace(".", ","); //Valor a ser mostrado no documento (Troca o ponto pela vírgula novamente)

    //Cria a área de resultado do cálculo
    criarTag("container", "div", "id", "caixa-resultado");

    //Cria o texto informativo do resultado
    criarTag("caixa-resultado", "h4", "id", "titulo-resultado");

    //Insere um texto como resultado conforme o resultado do cálculo do IMC
    let titulo = document.getElementById("titulo-resultado");

    if (usrInfo.sexo == "Masculino") {
        if (calcIMC1 >= 40.0) {
            titulo.append(
                usrInfo.nome + ", seu IMC é: " + calcIMC3 + " kg/m². Muita atenção, você está bastante acima do peso ideal. Veja as classificações na tabela abaixo:"
            );
            inserirTabela();
            document.getElementById("obs-morbid").setAttribute("class", "pessimo");
        }
        if (calcIMC1 >= 30.0 && calcIMC1 <= 39.9) {
            titulo.append(
                usrInfo.nome + ", seu IMC é: " + calcIMC3 + " kg/m². Muita atenção, você está bastante acima do que é considerado peso ideal. Veja as classificações na tabela abaixo:"
            );
            inserirTabela();
            document.getElementById("obs-moder").setAttribute("class", "ruim");
        }
        if (calcIMC1 >= 25.0 && calcIMC1 <= 29.9) {
            titulo.append(
                usrInfo.nome + ", seu IMC é: " + calcIMC3 + " kg/m². Atenção, você está acima do que é considerado peso ideal. Veja as classificações na tabela abaixo:"
            );
            inserirTabela();
            document.getElementById("obs-leve").setAttribute("class", "regular");
        }
        if (calcIMC1 >= 20.0 && calcIMC1 <= 24.9) {
            titulo.append(
                usrInfo.nome + ", seu IMC é: " + calcIMC3 + " kg/m². Parabéns! Você está dentro do que é considerado peso ideal. Veja as classificações na tabela abaixo:"
            );
            inserirTabela();
            document.getElementById("normal").setAttribute("class", "bom");
        }
        if (calcIMC1 < 20.0) {
            titulo.append(
                usrInfo.nome + ", seu IMC é: " + calcIMC3 + " kg/m². Atenção, você está abaixo do que é considerado peso ideal. Veja as classificações na tabela abaixo:"
            );
            inserirTabela();
            document.getElementById("abaixo").setAttribute("class", "pessimo");
        }
    } else {
        if (calcIMC1 >= 39.0) {
            titulo.append(
                usrInfo.nome + ", seu IMC é: " + calcIMC3 + " kg/m². Muita atenção, você está bastante acima do peso ideal. Veja as classificações na tabela abaixo:"
            );
            inserirTabela();
            document.getElementById("obs-morbid").setAttribute("class", "pessimo");
        }
        if (calcIMC1 >= 29.0 && calcIMC1 <= 38.9) {
            titulo.append(
                usrInfo.nome + ", seu IMC é: " + calcIMC3 + " kg/m². Muita atenção, você está bastante acima do que é considerado peso ideal. Veja as classificações na tabela abaixo:"
            );
            inserirTabela();
            document.getElementById("obs-moder").setAttribute("class", "ruim");
        }
        if (calcIMC1 >= 24.0 && calcIMC1 <= 28.9) {
            titulo.append(
                usrInfo.nome + ", seu IMC é: " + calcIMC3 + " kg/m². Atenção, você está acima do que é considerado peso ideal. Veja as classificações na tabela abaixo:"
            );
            inserirTabela();
            document.getElementById("obs-leve").setAttribute("class", "regular");
        }
        if (calcIMC1 >= 19.0 && calcIMC1 <= 23.9) {
            titulo.append(
                usrInfo.nome + ", seu IMC é: " + calcIMC3 + " kg/m². Parabéns! Você está dentro do que é considerado peso ideal. Veja as classificações na tabela abaixo:"
            );
            inserirTabela();
            document.getElementById("normal").setAttribute("class", "bom");
        }
        if (calcIMC1 < 19.0) {
            titulo.append(
                usrInfo.nome + ", seu IMC é: " + calcIMC3 + " kg/m². Atenção, você está abaixo do que é considerado peso ideal. Veja as classificações na tabela abaixo:"
            );
            inserirTabela();
            document.getElementById("abaixo").setAttribute("class", "pessimo");
        }
    }

    window.scrollTo(0, 500);

}