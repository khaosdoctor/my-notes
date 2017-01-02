/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lucaslocal.redisbit;

import java.util.Random;
import redis.clients.jedis.Jedis;

/**
 *
 * @author Lucas
 */
public class Redis {
    final static Jedis jedis = new Jedis("localhost");
    
    public static void main(String[] args) {
        Random rnd = new Random();
        Redis acesso = new Redis();
        int usuarios = 500, acessos = 1000, dias = 30;
        
        for (Integer numero = 1; numero <= acessos; numero++) {
            long usuario = (rnd.nextInt(usuarios)+1);
            String data = String.format("%02d/11/2013",(rnd.nextInt(dias)+1));
            
            acesso.armazenar(usuario, data);
        }
    }
    
    public void armazenar(long codigo, String data)
    {
        String chave = String.format("acesso:%s", data);
        jedis.setbit(chave, codigo, true);
        
    }
}
