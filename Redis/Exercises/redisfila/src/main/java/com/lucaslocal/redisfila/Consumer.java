/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lucaslocal.redisfila;

import com.google.gson.Gson;
import java.util.List;
import redis.clients.jedis.Jedis;

/**
 *
 * @author Lucas
 */
public class Consumer {

    class Mensagem {

        private String nome, email;

        public String getNome() {
            return nome;
        }

        public void setNome(String nome) {
            this.nome = nome;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }
    
    public void consume()
    {
        int timeout = 2;
        String chave = "fila:confirmar-usuario";
        
        Jedis jedis = new Jedis("localhost");
        
        List<String> mensagens = jedis.blpop(timeout, chave);
        
        if(mensagens == null)
        {
            System.out.println(String.format("A fila %s está vazia",chave));
        }
        else
        {
            String json = mensagens.get(1);
            Mensagem mensagem = new Gson().fromJson(json, Mensagem.class);
            
            System.out.println(String.format("Enviando e-mail para %s (%s)", mensagem.getEmail(), mensagem.getNome()));
        }
    }
}
