function renderMobileManualTemplate(){
    return `
        <div class="mobile-Controler">
            <div class="controler-head">
                <h3>Mobile Device</h3>
                <div class="exitBtn" onclick="toggleManual()"></div>
            </div>
            *To win, Pepe must defeat BossChicken, which he can only do if he collects enough Tabasco bottles.<br>
            *Key assignments for the PC can be found under Canvas. 
            <div class="mobile-description">
                <div class="movement">
                    <div class="left space"></div>
                    <div class="text">moving left</div>
                </div>
                <div class="movement">
                    <div class="right space"></div>
                    <div class="text">moving right</div>
                </div>
                <div class="movement">
                    <div class="up space"></div>
                    <div class="text">jumping</div>
                </div>
                <div class="movement">
                    <div class="attack space"></div>
                    <div class="text">throw bottles</div>
                </div>    
            </div>
        </div>
    `
}