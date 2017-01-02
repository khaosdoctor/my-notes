/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lucaslocal.redisismember;

import redis.clients.jedis.Jedis;

/**
 *
 * @author Lucas
 */
public class Redis {
    
    Jedis jedis = new Jedis("localhost");
    
    public static void main(String[] args)
    {
        Redis pessoa = new Redis();
        
        pessoa.existe("judo", "Rodrigo");
        pessoa.existe("livro", "Gustavo");
        pessoa.existe("cachorro", "Cristiane");
        pessoa.existe("cachorro", "Andressa");
    }
    
    public void existe(String grupo, String pessoa)
    {
        String chave = String.format("grupos:%s:membros", grupo);
        boolean resultado = jedis.sismember(chave, pessoa);
        
        System.out.println(String.format("%s é membro do grupo (%s)? %s", pessoa, grupo, resultado ? "Sim" : "Não"));
    }
}
