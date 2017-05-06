<?php

    include "../config/start.php";

    if( !@$_GET || !@$_POST ){
        header('HTTP/1.0 417 Expectation failed');
        die();
    }

    //header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, x-session-token');

    switch( $_GET["action"] ) {
        case "contact":
            $mail = new Mail(Array(
                "subject" => utf8_encode("Nova Mensagem de Contato Através do Site"),
                "recipients" => Array(
                    Array(
                        "mail_address" => "contato@omercadoamigo.com.br",
                        "mail_recipient" => utf8_encode("O Mercado Amigo")
                    )
                ),
                "message" => "
                    <b>Nome:</b> {$_POST["name"]}<br/>
                    <b>Email:</b> {$_POST["email"]}<br/>
                    <b>Mensagem:</b> {$_POST["message"]}<br/>
                "
            ));

            if( !$mail->sendMail() ){
                header('HTTP/1.0 420 Method Failure');
            }
        break;
        case "register":

            $data = (Object)$_POST;
            $data->dados = (Object)$data->dados;
            $data->endereco = (Object)$data->endereco;
            $data->endereco->estado = (Object)$data->endereco->estado;
            $data->endereco->cidade = (Object)$data->endereco->cidade;
            $data->endereco->bairro = (Object)$data->endereco->bairro;
            $data->entrega = (Object)$data->entrega;
            $data->entrega->estado = (Object)$data->entrega->estado;
            $data->entrega->cidade = (Object)$data->entrega->cidade;
            $data->entrega->bairro = (Object)$data->entrega->bairro;
            $data->contato = (Object)$data->contato;
            $data->contato->cel1 = (Object)$data->contato->cel1;
            $data->contato->cel2 = (Object)$data->contato->cel2;
            $data->bancario = (Object)$data->bancario;

            $message = "";
            $noInfo = "<i>não informado</i>";

            $equalAddress = $_POST["enderecos_iguais"];
            unset($_POST["enderecos_iguais"]);

            $message .= "<b>DADOS PESSOAIS</b><br/>";
            $message .= "<b>Nome:</b> {$data->dados->nome}<br/>";
            $message .= "<b>CPF:</b> {$data->dados->cpf}<br/>";
            $message .= "<b>RG:</b> {$data->dados->rg}<br/>";
            $message .= "<b>Data de Nascimento:</b> {$data->dados->nascimento}</br>";
            $message .= "<b>Sexo:</b> {$data->dados->sexo}</br>";
            $message .= "<br/>";
            $message .= "<b>ENDEREÇO PESSOAL</b><br/>";
            $message .= "<b>CEP:</b> {$data->endereco->cep}<br/>";
            $message .= "<b>Estado:</b> {$data->endereco->estado->uf} - {$data->endereco->estado->nome}<br/>";
            $message .= "<b>Cidade:</b> {$data->endereco->cidade->nome}<br/>";
            $message .= "<b>Bairro:</b> {$data->endereco->bairro->nome}<br/>";
            $message .= "<b>EndereÇo:</b> {$data->endereco->logradouro}<br/>";
            $message .= "<b>NÚmero:</b> {$data->endereco->numero}<br/>";
            $message .= "<b>Complemento:</b> " . ( $data->endereco->complemento ? $data->endereco->complemento : $noInfo ) . "<br/>";
            $message .= "<br/>";
            $message .= "<b>ENDEREÇO DE ENTREGA</b><br/>";
            $message .= "<b>CEP:</b> {$data->entrega->cep}<br/>";
            $message .= "<b>Estado:</b> {$data->entrega->estado->uf} - {$data->entrega->estado->nome}<br/>";
            $message .= "<b>Cidade:</b> {$data->entrega->cidade->nome}<br/>";
            $message .= "<b>Bairro:</b> {$data->entrega->bairro->nome}<br/>";
            $message .= "<b>Endereço:</b> {$data->entrega->logradouro}<br/>";
            $message .= "<b>Número:</b> {$data->entrega->numero}<br/>";
            $message .= "<b>Complemento:</b> " . ( $data->entrega->complemento ? $data->entrega->complemento : $noInfo ) . "<br/>";
            $message .= "<br/>";
            $message .= "<b>DADOS DE CONTATO</b><br/>";
            $message .= "<b>Email:</b> {$data->contato->email}<br/>";
            $message .= "<b>Telefone:</b> " . ( $data->contato->telefone ? $data->contato->telefone : $noInfo ) . "<br/>";
            $message .= "<b>Celular 1:</b> {$data->contato->cel1->numero}({$data->contato->cel1->operadora}) - WhatsApp({$data->contato->cel1->whatsapp})<br/>";
            $message .= "<b>Celular 2:</b> " . ( $data->contato->cel2->numero ? $data->contato->cel2->numero : $noInfo ) . ( $data->contato->cel2->operadora ? " ({$data->contato->cel1->operadora})" : "" ) . ( $data->contato->cel2->whatsapp ? " - Whatsapp({$data->contato->cel2->whatsapp})" : "" ) . " <br/>";
            $message .= "<br/>";
            $message .= "<b>DADOS BANCÁRIOS</b><br/>";
            $message .= "<b>Banco:</b> {$data->bancario->banco}<br/>";
            $message .= "<b>Agência:</b> {$data->bancario->agencia}<br/>";
            $message .= "<b>Conta:</b> {$data->bancario->conta}<br/>";
            $message .= "<b>Tipo:</b> {$data->bancario->tipo}</br>";

            $message = utf8_encode($message);

            $mail = new Mail(Array(
                "subject" => utf8_encode("Novo Cadastro Através do Site"),
                "recipients" => Array(
                    Array(
                        "mail_address" => "contato@omercadoamigo.com.br",
                        "mail_recipient" => utf8_encode("O Mercado Amigo")
                    )
                ),
                "message" => $message
            ));

            if( !$mail->sendMail() ){
                header('HTTP/1.0 420 Method Failure');
            }

        break;
    }

?>