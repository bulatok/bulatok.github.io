<script lang="ts">
import { onMount } from "svelte";


    let rate: string = "wait..";
    function showCurrency(): void{
        const api_url: string = "https://api.coindesk.com/v1/bpi/currentprice.json"
        fetch(api_url)
            .then((resp) => resp.json())
            .then((data) => {
                rate = `BTC/USD ${data.bpi.USD.rate_float}`
            })
    }
    function isMobile(): boolean{
        let w: number = window.innerWidth;
        let h: number = window.innerHeight;
        console.log("w = ", w, " h = ", h);
        if (w < 400 && h < 900){
            return true
        }
        return false;
    }
    
    showCurrency()
    
</script>

<style>
</style>

<div class="navbar_currency">
    <div id="currecny_rate_USD" class="navbar_currency_rate">{rate}</div>
</div>