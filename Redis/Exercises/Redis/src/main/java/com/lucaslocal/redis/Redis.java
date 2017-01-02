/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lucaslocal.redis;

import java.util.Set;
import redis.clients.jedis.Jedis;

/**
 *
 * @author Lucas
 */
public class Redis {

    public static void main(String[] args) {

        Jedis jedis = new Jedis("localhost");

        String data1 = "03-09-2013";
        String chave1 = String.format("resultado:%s:megasena", data1);
        String numeros1 = "2, 15, 45, 32, 10, 1";

        String data2 = "02-10-2013";
        String chave2 = String.format("resultado:%s:megasena", data2);
        String numeros2 = "3, 4, 55, 26, 34, 42";

        String data3 = "06-09-2013";
        String chave3 = String.format("resultado:%s:megasena", data3);
        String numeros3 = "28, 33, 18, 49, 51, 26";

        String data4 = "21-09-2013";
        String chave4 = String.format("resultado:%s:megasena", data4);
        String numeros4 = "5, 19, 44, 13, 28, 50";

        System.out.println(jedis.mset(chave1, numeros1, chave2, numeros2, chave3, numeros3, chave4, numeros4));

        int mes = 10;
        int ano = 2013;

        Set<String> chaves = new Redis().filtrar(mes, ano);

        System.out.println(chaves);

        String ganhadores = "22";
        String datasorteio = "09-11-2013";
        String numeros = "8, 18, 26, 42, 56, 58";
        String chave = String.format("resultado:%s:megasena", datasorteio);

        long resultado1 = jedis.hset(chave, "ganhadores", ganhadores);
        long resultado2 = jedis.hset(chave, "numeros", numeros);

        String mensagem = String.format("Resultado 1 = %d, Resultado 2 = %d", resultado1, resultado2);

        System.out.println(mensagem);

        String ganhadoresget = jedis.hget(chave, "ganhadores");
        String numerosget = jedis.hget(chave, "numeros");

        System.out.println(String.format("Ganhadores: %s, Números: [%s]", ganhadores, numeros));
        

    }

    public Set<String> filtrar(int mes, int ano) {
        String chave = "resultado:0?-%02d-%04d:megasena";
        Jedis jedis = new Jedis("localhost");

        return jedis.keys(String.format(chave, mes, ano));
    }
}
