/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lucaslocal.redisscard;

import java.util.Set;
import redis.clients.jedis.Jedis;

/**
 *
 * @author Lucas
 */
public class Redis {

    public static void main(String[] args) {
        Jedis jedis = new Jedis("localhost");

        Set<String> grupos = jedis.keys("grupos:*");

        for (String grupo : grupos) {
            long res = jedis.scard(grupo);
            Set<String> membros = jedis.smembers(grupo);
            System.out.println(String.format("O grupo %s tem %d membros: %s", grupo.split(":")[1], res, membros.toString()));

        }
    }
}
