/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lucaslocal.redisbitretrieve;

import static java.lang.System.out;
import java.util.Arrays;
import redis.clients.jedis.Jedis;

/**
 *
 * @author Lucas
 */
public class GetData {

    static final Jedis jedis = new Jedis("localhost");

    public long getByDate(String... datas) {
        long total = 0;

        for (String data : datas) {
            String chave = String.format("acesso:%s", data);
            total += jedis.bitcount(chave);
        }
        return total;
    }

    public static void main(String[] args) {
        GetData dados = new GetData();
        String[] diario = {"05/11/2013"};
        String[] semanal = {"16/11/2013", "17/11/2013", "18/11/2013", "19/11/2013", "20/11/2013", "21/11/2013", "22/11/2013"};
        long totaldiario = dados.getByDate(diario);
        long totalsemanal = dados.getByDate(semanal);

        out.println(String.format("Total de usuários únicos no dia %s foi: %d", Arrays.asList(diario), totaldiario));
        out.println(String.format("Total de usuários únicos nos dias %s foi: %d", Arrays.asList(semanal), totalsemanal));
    }
}
