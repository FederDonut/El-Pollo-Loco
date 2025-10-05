function renderMobileManualTemplate(){
    return `
        <div class="mobile-Controler">
            <div class="controler-head">
                <h3>Mobile Device</h3>
                <div class="exitBtn" onclick="toggleManual()"></div>
            </div>
            
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