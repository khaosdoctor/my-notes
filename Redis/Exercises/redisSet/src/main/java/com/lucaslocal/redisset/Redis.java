/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lucaslocal.redisset;

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
        relacionamentos.addFriend("Rafael", new String[]{"Gustavo", "Andressa", "Rodrigo", "Tereza"});
        relacionamentos.addFriend("Andressa", new String[]{"Gustavo", "Cristiane", "Rodrigo", "Tereza"});
        relacionamentos.addFriend("Gustavo", new String[]{"Carlos", "Andressa", "Rafael", "Tereza"});
        relacionamentos.addFriend("Cristiane", new String[]{"Carlos", "Andressa", "Tereza"});
        relacionamentos.addFriend("Carlos", new String[]{"Cristiane", "Gustavo", "Rodrigo"});
        relacionamentos.addFriend("Rodrigo", new String[]{"Andressa", "Rafael", "Carlos"});
        relacionamentos.addFriend("Tereza", new String[]{"Cristiane", "Gustavo", "Rafael"});

    }

    public void addFriend(String pessoa, String[] amigos) {
        String chave = String.format("pessoas:%s:relacionamentos", pessoa);
        long res = jedis.sadd(chave, amigos);
        System.out.println(String.format("%s tem %d amigos %s", pessoa, res, Arrays.toString(amigos)));
    }

}
