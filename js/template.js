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

function renderImpressum(){
    return `

            <div class="siteHeadline">
                <h1 class="impressumH1">Imprint</h1>
                <div class="exitBtn" onclick="toggleImpressum()"></div>
            </div>

            <section class="impContent-wrapper">


                <section class="content">
                    <div class="headline">1. Provider</div>
                    <div class="sub-content">
                        Raphael Z. <br>
                        Schmalzgasse 10<br>
                        72770 Offenburg
                    </div>
                </section>
                <section class="content">
                    <div class="headline">2. Contact</div>
                    <div class="sub-content">
                        Telefon: 049/1234567-8. <br>
                        E-Mail: mail@mustermann.de<br>
                        Website: www.mustermann.de
                    </div>
                </section>
                <section class="content">
                    <div class="headline">3. Acceptance of Terms</div>
                    <div class="sub-content">
                        By accessing or playing El Pollo Loco, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree, you must not use the game.
                    </div>
                </section>
                <section class="content">
                    <div class="headline">4. License</div>
                    <div class="sub-content">
                        El Pollo Loco is provided for personal, non-commercial use only. You are granted a limited, non-exclusive, non-transferable license to access and play the game.
                        <br>
                        <br>
                        <u>You may not:</u>
                        <br>
                        <br>
                        - Copy, modify, or distribute the game or its source code without permission.
                        <br>
                        - Reverse engineer or attempt to extract the source code.
                        <br>
                        - Use the game for unlawful or harmful purposes.
                </section>
    
                <section class="content">
                    <div class="headline">5. Intellectual Property</div>
                    <div class="sub-content">
                        All content, graphics, code, and other materials related to El Pollo Loco are owned by the developer unless otherwise stated. Unauthorized use may violate copyright, trademark, or other laws.
    
                    </div>
    
                </section>
    
                <section class="content">
                    <div class="headline">6. Disclaimer of Warranties</div>
                    <div class="sub-content">
                       El Polo Loco is provided “as is” without any warranties, express or implied. The owner makes no guarantees that the game will be error-free, uninterrupted, or compatible with all devices. 
                    </div>
    
                </section>
    
                <section class="content">
                    <div class="headline">7. Limitation of Liability</div>
                    <div class="sub-content">
                        To the fullest extent permitted by law, the owner shall not be liable for any damages resulting from the use or inability to use the game, including but not limited to loss of data, device malfunction, or indirect damages.
                    </div>
    
                </section>
    
                <section class="content">
                    <div class="headline">8. User Conduct</div>
                    <div class="sub-content">
                        You agree not to use El Pollo Loco in any way that could damage, disable, or impair the servers, networks, or other infrastructure supporting it. Cheating, exploiting bugs, or using unauthorized third-party tools is strictly prohibited.
                    </div>
    
                </section>
    
                <section class="content">
                    <div class="headline">9. Privacy</div>
                    <div class="sub-content">
                        El Pollo Loco does not intentionally collect personal data unless explicitly stated.
                    </div>
    
                </section>
    
                <section class="content">
                    <div class="headline">10. Updates and Changes</div>
                    <div class="sub-content">
                        The owner reserves the right to update, modify, or discontinue the game at any time without prior notice. Terms of Use may also be updated, and continued use of the game constitutes acceptance of those changes.
                    </div>
    
                </section>
    
                <section class="content">
                    <div class="headline">11. Governing Law</div>
                    <div class="sub-content">
                        These Terms shall be governed by and construed in accordance with the laws of your country. Any disputes arising from the use of the game shall be subject to the jurisdiction.
                    </div>
    
                </section>
            </section>            
        
            

    `
}