/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lucaslocal.redis1;

import static java.lang.System.out;
import java.util.HashMap;
import java.util.Map;
import redis.clients.jedis.Jedis;

/**
 *
 * @author Lucas
 */
public class Redis {

    public static void main(String[] args) {
        Jedis jedis = new Jedis("localhost");
        final String id = "1962";
        final String nome = "Peter Parker";
        final String email = "spidey@marvel.com";

        String chave = "sessao:usuario:" + id;
        Map<String, String> campos = new HashMap<String, String>() {
            {
                put("codigo", id);
                put("nome", nome);
                put("email", email);
            }
        };
        String resultado = jedis.hmset(chave, campos);
        jedis.expire(chave, 1800); //1800 = 30 min em seg.
        out.println(resultado);

    }
}
