/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lucaslocal.redissortedset;

import redis.clients.jedis.Jedis;

/**
 *
 * @author Lucas
 */
public class Redis {
    static Jedis jedis = new Jedis("localhost");
    
    public static void main(String[] args) {
        int codigo  = 1;
        String nome = "Rafael";
        String chave = String.format("jogador:%04d:codigo",codigo);
        
        long res1 = jedis.hset(chave, "nome", nome);
        long res2 = jedis.hset(chave, "pontuacao", "0");
        
        System.out.println(String.format("Res1: %d Res2: %d",res1,res2));
        
        adicionarVitoria(codigo);
        adicionarVitoria(codigo);
        adicionarDerrota(codigo);
        adicionarVitoria(codigo);
        
    }
    
    private static void definirNovaPontuacao(int codigo, int ponto) {
        String chave = String.format("jogador:%04d:codigo",codigo);
        long nova = jedis.hincrBy(chave, "pontuacao", ponto);
        System.out.println(String.format("A pontuação do jogador %04d foi para %d", codigo, nova));
    }
    
    public static void adicionarVitoria(int codigo) {
        definirNovaPontuacao(codigo, 1);
    }
    
    public static void adicionarDerrota(int codigo) {
        definirNovaPontuacao(codigo, -1);
    }
}
