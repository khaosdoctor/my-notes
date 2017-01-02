/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lucaslocal.redissinter;

import java.util.Set;
import redis.clients.jedis.Jedis;

/**
 *
 * @author Lucas
 */
public class Redis {
    Jedis jedis = new Jedis("localhost");
    
    public static void main(String[] args)
    {
        Redis relacionamentos = new Redis();
        
        relacionamentos.seeRelations("Rafael", "cachorro");
        relacionamentos.seeRelations("Rodrigo", "video-game");
        relacionamentos.seeRelations("Andressa", "novela");
    }
    
    public void seeRelations(String pessoa, String grupo)
    {
        String chavePessoa = String.format("pessoas:%s:relacionamentos", pessoa);
        String chaveGrupo = String.format("grupos:%s:membros", grupo);
        
        Set<String> pessoas = jedis.sinter(chavePessoa, chaveGrupo);
        
        System.out.println(String.format("%s são amigos de %s "+ "e fazem também parte do grupo que gosta de %s", pessoas.toString(), pessoa, grupo));
    }
}
