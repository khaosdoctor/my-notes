/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lucaslocal.redisset1;

import java.util.Arrays;
import redis.clients.jedis.Jedis;

/**
 *
 * @author Lucas
 */
public class Redis {

    static final Jedis jedis = new Jedis("localhost");

    public static void main(String[] args) {
        Redis relacionamentos = new Redis();

        relacionamentos.addToGroup("video-game", new String[]{"Rafael", "Gustavo", "Carlos", "Rodrigo"});
        relacionamentos.addToGroup("judo", new String[]{"Rafael"});
        relacionamentos.addToGroup("natacao", new String[]{"Rafael", "Cristiane"});
        relacionamentos.addToGroup("kung-fu", new String[]{"Andressa"});
        relacionamentos.addToGroup("violao", new String[]{"Gustavo"});
        relacionamentos.addToGroup("ciclismo", new String[]{"Cristiane"});
        relacionamentos.addToGroup("cachorro", new String[]{"Cristiane", "Tereza", "Rodrigo"});
        relacionamentos.addToGroup("moto", new String[]{"Carlos"});
        relacionamentos.addToGroup("carro", new String[]{"Carlos", "Rodrigo"});
        relacionamentos.addToGroup("livro", new String[]{"Gustavo", "Rodrigo"});
        relacionamentos.addToGroup("novela", new String[]{"Andressa", "Cristiane", "Tereza"});

    }

    public void addToGroup(String grupo, String[] membros) {
        String chave = String.format("grupos:%s:membros", grupo);

        long res = jedis.sadd(chave, membros);

        System.out.println(String.format("O grupo (%s) tem %d membros %s", grupo, res, Arrays.toString(membros)));
    }
}
