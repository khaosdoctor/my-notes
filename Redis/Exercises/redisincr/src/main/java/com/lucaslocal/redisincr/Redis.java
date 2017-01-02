/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lucaslocal.redisincr;

import static java.lang.System.out;
import java.util.Random;
import redis.clients.jedis.Jedis;

/**
 *
 * @author Lucas
 */
public class Redis {

    static final Jedis jedis = new Jedis("localhost");
    static final Random rnd = new Random();
    
    public static void main(String[] args) {
        String data = "02/09/2013";
        String[] paginas = {
            "/index",
            "/about",
            "/courses",
            "/all",
            "/contact"
        };

        for (int i = 0; i < 250; i++) {
            int p = rnd.nextInt(paginas.length);
            gerarEstatisticas(paginas[p], data);
        }

    }

    public static void gerarEstatisticas(String pagina, String data) {
        String chave = String.format("pagina:%s:%s:visitas", pagina, data);
        long resultado = jedis.incr(chave);
        out.println(String.format("Página %s teve %d acesso(s) em %s", pagina, resultado, data));
    }
}
