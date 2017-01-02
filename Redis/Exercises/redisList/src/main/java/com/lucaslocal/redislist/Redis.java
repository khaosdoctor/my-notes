/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lucaslocal.redislist;

import static java.lang.System.*;
import java.util.List;
import redis.clients.jedis.Jedis;

/**
 *
 * @author Lucas
 */
public class Redis {

    static final Jedis jedis = new Jedis("localhost");

    public static void main(String[] args) {
        String chave = "ultimas_paginas_visitadas";
        String[] paginas = {"/inicio", "/contato", "/sobre-mim", "/todos-os-posts", "/post-231423"};

        jedis.del(chave);

        long res = jedis.lpush(chave, paginas);

        out.println(jedis.ltrim(chave, 0, 2));

        out.println(String.format("A lista %s contém %d elementos", chave, res));

        List<String> paginas_vis = jedis.lrange(chave, 0, 2);

        out.println("As ultimas 3 páginas visitadas são:");

        for (String pagina : paginas_vis) {
            out.println(pagina);
        }

    }
}
