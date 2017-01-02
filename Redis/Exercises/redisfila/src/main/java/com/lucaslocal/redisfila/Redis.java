/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lucaslocal.redisfila;

import static java.lang.System.out;
import redis.clients.jedis.Jedis;

/**
 *
 * @author Lucas
 */
public class Redis {

    static final Jedis jedis = new Jedis("localhost");

    public static void main(String[] args) {
        Redis fila = new Redis();
        
        fila.agendarAutorizacao("Carlos Saldanha", "saldanha@gmail.com");
        fila.agendarAutorizacao("Pedro Saldanha", "saldanha@gmail.com");
        fila.agendarAutorizacao("André Saldanha", "saldanha@gmail.com");
        fila.agendarAutorizacao("Maria Saldanha", "saldanha@gmail.com");
        fila.agendarAutorizacao("Júlia Saldanha", "saldanha@gmail.com");
        fila.agendarAutorizacao("Milena Saldanha", "saldanha@gmail.com");
        
        Consumer consumer = new Consumer();
        
        while(true)
        {
            consumer.consume();
        }

    }

    public void agendarAutorizacao(String nome, String email) {
        String chave = "fila:confirmar-usuario";
        String mensagem = String.format("{\"nome\": \"%s\", \"email\": \"%s\"}", nome, email);

        long resultado = jedis.rpush(chave, mensagem);
        out.println(String.format("A fila %s contém %d tarefas", chave, resultado));
        
        
    }
    
    

}
