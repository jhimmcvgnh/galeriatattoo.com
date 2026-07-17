/* booking-modal.js */

(function() {
    // 1. Injetar a estrutura HTML do modal no corpo da página
    const modalHTML = `
    <div class="booking-overlay" id="bookingOverlay">
        <div class="booking-phone booking-popup">
            <!-- Botão de Fechar -->
            <button class="booking-close" id="bookingClose" aria-label="Fechar">&times;</button>
            
            <!-- Área de Conteúdo das Fases -->
            <div class="booking-content" id="bookingContent">
                
                <!-- FASE 1 -->
                <div class="booking-phase active" id="phase1">
                    <h2 class="phase-title">Onde será a arte?</h2>
                    
                    <label class="form-label">Escolha o local do corpo:</label>
                    <div class="body-parts-grid" id="bodyPartsGrid">
                        <div class="body-part-card" data-value="Braço">Braço</div>
                        <div class="body-part-card" data-value="Perna">Perna</div>
                        <div class="body-part-card" data-value="Costas">Costas</div>
                        <div class="body-part-card" data-value="Peito">Peito</div>
                        <div class="body-part-card" data-value="Pescoço">Pescoço</div>
                        <div class="body-part-card" data-value="Outro">Outro</div>
                    </div>
                    
                    <div class="toggle-container">
                        <span class="form-label" style="margin-bottom: 0;">Mais de uma tatuagem?</span>
                        <label class="switch">
                            <input type="checkbox" id="multiTattoo">
                            <span class="slider"></span>
                        </label>
                    </div>
                    
                    <label class="form-label">Link da Imagem de referência (Opcional):</label>
                    <div class="url-input-container" id="urlInputArea" style="display: flex; gap: 8px; margin-bottom: 12px;">
                        <input type="text" id="urlInput" class="booking-input" placeholder="Cole o link da imagem (ex: Pinterest, Instagram, etc.)..." style="flex: 1; border-bottom: 1px solid rgba(231, 243, 226, 0.3); margin-bottom: 0; padding: 6px 0;">
                        <button type="button" class="booking-btn" id="btnConfirmUrl" style="flex: 0 0 auto; width: auto; padding: 8px 12px; margin: 0; font-size: 10px;">Adicionar</button>
                    </div>
                    <div class="upload-previews-container" id="uploadPreviewsContainer" style="display: none; margin-top: 12px;"></div>
                </div>
                
                <!-- FASE 2 -->
                <div class="booking-phase" id="phase2">
                    <h2 class="phase-title">Selecione Data e Hora</h2>
                    
                    <label class="form-label">Data:</label>
                    <div class="calendar-widget">
                        <div class="calendar-header">
                            <button class="calendar-nav-btn" id="calPrev">&lt;</button>
                            <span class="calendar-month-year" id="calMonthYear">Julho 2026</span>
                            <button class="calendar-nav-btn" id="calNext">&gt;</button>
                        </div>
                        <div class="calendar-grid" id="calendarGrid">
                            <!-- Populado via JS -->
                        </div>
                    </div>
                    
                    <label class="form-label">Horários Disponíveis:</label>
                    <div class="time-slots-container">
                        <div class="time-slots-grid" id="timeSlotsGrid">
                            <div class="time-slot-btn" data-time="09:00">09:00</div>
                            <div class="time-slot-btn" data-time="10:30">10:30</div>
                            <div class="time-slot-btn" data-time="13:00">13:00</div>
                            <div class="time-slot-btn" data-time="14:30">14:30</div>
                            <div class="time-slot-btn" data-time="16:00">16:00</div>
                            <div class="time-slot-btn" data-time="17:30">17:30</div>
                        </div>
                    </div>
                    
                    <label class="form-label">Suas Informações:</label>
                    <div class="form-group">
                        <input type="text" id="custName" class="booking-input" placeholder="Nome Completo" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" id="custPhone" class="booking-input" placeholder="Telefone (WhatsApp)" required>
                    </div>
                    <div class="form-group">
                        <input type="email" id="custEmail" class="booking-input" placeholder="Seu E-mail" required>
                    </div>
                </div>
                
                <!-- FASE 3 -->
                <div class="booking-phase" id="phase3">
                    <h2 class="phase-title">Confirme suas Escolhas</h2>
                    
                    <div class="summary-box">
                        <div class="summary-row">
                            <span class="summary-label">Tatuagem</span>
                            <span class="summary-val-container">
                                <span class="summary-val" id="sumTatoo">Braço</span>
                                <button type="button" class="summary-edit-btn" data-step="1">Alterar</button>
                            </span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Mais de uma</span>
                            <span class="summary-val-container">
                                <span class="summary-val" id="sumMulti">Não</span>
                                <button type="button" class="summary-edit-btn" data-step="1">Alterar</button>
                            </span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Referências</span>
                            <span class="summary-val-container">
                                <span class="summary-val" id="sumPhotos">Nenhuma</span>
                                <button type="button" class="summary-edit-btn" data-step="1" id="btnEditPhotos">Alterar</button>
                            </span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Data & Hora</span>
                            <span class="summary-val-container">
                                <span class="summary-val" id="sumDateTime">-</span>
                                <button type="button" class="summary-edit-btn" data-step="2">Alterar</button>
                            </span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Cliente</span>
                            <span class="summary-val-container">
                                <span class="summary-val" id="sumName">-</span>
                                <button type="button" class="summary-edit-btn" data-step="2">Alterar</button>
                            </span>
                        </div>
                    </div>
                    
                    <div class="summary-previews-container" id="summaryPreviewsContainer" style="display: none; margin-top: 12px; margin-bottom: 16px;"></div>
                    
                    <!-- Alteração Direta do Link de Imagem no Resumo -->
                    <div class="summary-url-section" id="summaryUrlSection" style="display: flex; gap: 8px; margin-bottom: 20px;">
                        <input type="text" id="summaryUrlInput" class="booking-input" placeholder="Cole o novo link da imagem..." style="flex: 1; border-bottom: 1px solid rgba(231, 243, 226, 0.3); margin-bottom: 0;">
                        <button type="button" class="summary-upload-btn" id="btnSummaryUrlAdd" style="width: auto; margin-bottom: 0; padding: 8px 14px; white-space: nowrap;">📷 Trocar Imagem</button>
                    </div>

                    <div class="confirm-actions-container">
                        <button type="button" class="confirm-action-btn confirm-btn-whatsapp" id="btnConfirmWhatsapp">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="wpp-icon" style="width: 14px; height: 14px; margin-right: 6px; vertical-align: middle;">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>Falar no WhatsApp</button>
                        <button type="button" class="confirm-action-btn confirm-btn-submit" id="btnConfirmSubmit">Confirmar Agendamento</button>
                    </div>
                </div>
                
                <!-- TELA DE SUCESSO -->
                <div class="booking-phase" id="phaseSuccess">
                    <div class="success-screen">
                        <div class="success-icon-container">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 class="phase-title" style="margin-bottom: 8px;">Tudo Pronto!</h2>
                        <p class="success-subtitle" id="successMsg">Seu agendamento foi pré-confirmado.<br>Entraremos em contato pelo WhatsApp em breve!</p>
                    </div>
                </div>
                
            </div>
            
            <!-- Barra de Rodapé de Botões (Voltar/Avançar) -->
            <div class="booking-buttons" id="bookingButtons">
                <button type="button" class="booking-btn" id="btnBack">Voltar</button>
                <button type="button" class="booking-btn booking-btn-primary" id="btnNext">Avançar</button>
            </div>

            <!-- Chat de Suporte Flutuante Acoplado -->
            <div class="chat-widget-container" id="chatWidgetContainer">
                <div class="chat-widget-button" id="chatWidgetButton" aria-label="Suporte">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chat-icon">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                </div>
                <div class="chat-widget-window" id="chatWidgetWindow">
                    <div class="chat-widget-header">
                        <div class="chat-widget-profile">
                            <span class="chat-widget-avatar">🎨</span>
                            <div class="chat-widget-status-info">
                                <span class="chat-widget-name">Suporte Quizz Tattoo</span>
                                <span class="chat-widget-status"><span class="status-dot"></span> Online</span>
                            </div>
                        </div>
                        <button class="chat-widget-close" id="chatWidgetClose">&times;</button>
                    </div>
                    <div class="chat-widget-body" id="chatWidgetBody">
                        <div class="chat-widget-message system">
                            Olá! Tem alguma dúvida sobre o agendamento? Digite sua dúvida abaixo para falar diretamente no WhatsApp!
                        </div>
                    </div>
                    <div class="chat-widget-footer">
                        <textarea class="chat-widget-input" id="chatWidgetInput" placeholder="Digite sua dúvida..." rows="1"></textarea>
                        <button class="chat-widget-send" id="chatWidgetSend">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    // Injeta o HTML no fim da página
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 2. Elementos DOM do Modal
    const overlay = document.getElementById('bookingOverlay');
    const closeBtn = document.getElementById('bookingClose');
    const btnBack = document.getElementById('btnBack');
    const btnNext = document.getElementById('btnNext');
    const buttonsArea = document.getElementById('bookingButtons');
    
    const phase1 = document.getElementById('phase1');
    const phase2 = document.getElementById('phase2');
    const phase3 = document.getElementById('phase3');
    const phaseSuccess = document.getElementById('phaseSuccess');

    // Variáveis de Estado
    let selectedBodyParts = [];
    let isMultiTattoo = false;
    let selectedLinks = [];
    
    let selectedDate = null;
    let selectedTimeSlot = null;
    
    let custName = "";
    let custPhone = "";
    let custEmail = "";
    
    let currentStep = 1;
    let calCurrentDate = new Date();

    // 3. Ouvintes de Eventos (Fase 1: Local do Corpo)
    const bodyPartCards = document.querySelectorAll('.body-part-card');
    bodyPartCards.forEach(card => {
        card.addEventListener('click', () => {
            const val = card.getAttribute('data-value');
            if (card.classList.contains('selected')) {
                card.classList.remove('selected');
                selectedBodyParts = selectedBodyParts.filter(part => part !== val);
            } else {
                card.classList.add('selected');
                selectedBodyParts.push(val);
            }
            validateStep();
        });
    });

    // Toggle multi tattoos
    const multiTattooCheck = document.getElementById('multiTattoo');
    const uploadPreviewsContainer = document.getElementById('uploadPreviewsContainer');
    const urlInputArea = document.getElementById('urlInputArea');
    const urlInput = document.getElementById('urlInput');
    const btnConfirmUrl = document.getElementById('btnConfirmUrl');
    
    multiTattooCheck.addEventListener('change', (e) => {
        isMultiTattoo = e.target.checked;
        if (isMultiTattoo) {
            urlInput.placeholder = 'Cole outro link da imagem...';
        } else {
            urlInput.placeholder = 'Cole o link da imagem...';
            if (selectedLinks.length > 1) {
                selectedLinks = selectedLinks.slice(0, 1);
            }
        }
        renderPreviews();
    });

    const addLink = (linkVal) => {
        let url = linkVal.trim();
        if (!url) return;
        
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        if (isMultiTattoo) {
            if (!selectedLinks.includes(url)) {
                selectedLinks.push(url);
            }
        } else {
            selectedLinks = [url];
        }
        renderPreviews();
    };

    if (btnConfirmUrl && urlInput) {
        btnConfirmUrl.addEventListener('click', () => {
            addLink(urlInput.value);
            urlInput.value = '';
        });

        urlInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addLink(urlInput.value);
                urlInput.value = '';
            }
        });
    }

    function renderPreviews() {
        uploadPreviewsContainer.innerHTML = '';
        
        if (selectedLinks.length === 0) {
            uploadPreviewsContainer.style.display = 'none';
            urlInputArea.style.display = 'flex';
        } else {
            uploadPreviewsContainer.style.display = 'block';
            urlInputArea.style.display = isMultiTattoo ? 'flex' : 'none';
            
            selectedLinks.forEach((link, index) => {
                const item = document.createElement('div');
                item.className = 'upload-preview-item';
                
                const img = document.createElement('img');
                img.src = link;
                img.className = 'upload-preview-img';
                
                const placeholder = document.createElement('div');
                placeholder.className = 'upload-preview-placeholder';
                placeholder.textContent = '🔗';
                placeholder.style.width = '40px';
                placeholder.style.height = '40px';
                placeholder.style.background = 'rgba(231, 243, 226, 0.1)';
                placeholder.style.border = '1px solid rgba(231, 243, 226, 0.2)';
                placeholder.style.borderRadius = '4px';
                placeholder.style.display = 'none';
                placeholder.style.alignItems = 'center';
                placeholder.style.justifyContent = 'center';
                placeholder.style.fontSize = '14px';

                img.onerror = () => {
                    img.style.display = 'none';
                    placeholder.style.display = 'flex';
                };
                
                const info = document.createElement('span');
                info.className = 'upload-preview-info';
                info.textContent = link;
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'upload-remove-item';
                removeBtn.type = 'button';
                removeBtn.innerHTML = '&times;';
                
                removeBtn.addEventListener('click', (evt) => {
                    evt.stopPropagation();
                    selectedLinks.splice(index, 1);
                    renderPreviews();
                });
                
                item.appendChild(img);
                item.appendChild(placeholder);
                item.appendChild(info);
                item.appendChild(removeBtn);
                uploadPreviewsContainer.appendChild(item);
            });
        }
        
        updateSummaryPhotosText();
        renderSummaryPreviews();
    }

    // Ouvintes de Eventos (Fase 2: Cliente)
    const inputName = document.getElementById('custName');
    const inputPhone = document.getElementById('custPhone');
    const inputEmail = document.getElementById('custEmail');

    const checkInputsValidity = () => {
        custName = inputName.value.trim();
        custPhone = inputPhone.value.trim();
        custEmail = inputEmail.value.trim();
        validateStep();
    };

    inputName.addEventListener('input', checkInputsValidity);
    inputPhone.addEventListener('input', checkInputsValidity);
    inputEmail.addEventListener('input', checkInputsValidity);

    // Time Slots Buttons
    const timeSlots = document.querySelectorAll('.time-slot-btn');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            timeSlots.forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
            selectedTimeSlot = slot.getAttribute('data-time');
            validateStep();
        });
    });

    // Calendar navigation
    document.getElementById('calPrev').addEventListener('click', () => {
        calCurrentDate.setMonth(calCurrentDate.getMonth() - 1);
        renderCalendar();
    });
    document.getElementById('calNext').addEventListener('click', () => {
        calCurrentDate.setMonth(calCurrentDate.getMonth() + 1);
        renderCalendar();
    });

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const dayNames = ["D", "S", "T", "Q", "Q", "S", "S"];

    function renderCalendar() {
        const grid = document.getElementById('calendarGrid');
        const monthYearLabel = document.getElementById('calMonthYear');
        grid.innerHTML = '';
        
        const year = calCurrentDate.getFullYear();
        const month = calCurrentDate.getMonth();
        monthYearLabel.textContent = `${monthNames[month]} ${year}`;
        
        dayNames.forEach(name => {
            const h = document.createElement('div');
            h.className = 'calendar-day-header';
            h.textContent = name;
            grid.appendChild(h);
        });
        
        const firstDayIndex = new Date(year, month, 1).getDay();
        const numDays = new Date(year, month + 1, 0).getDate();
        
        for (let i = 0; i < firstDayIndex; i++) {
            const empty = document.createElement('div');
            empty.className = 'calendar-day empty';
            grid.appendChild(empty);
        }
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        for (let d = 1; d <= numDays; d++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = d;
            
            const cellDate = new Date(year, month, d);
            
            if (cellDate < today) {
                dayCell.classList.add('disabled');
            } else {
                if (selectedDate && 
                    selectedDate.getDate() === d && 
                    selectedDate.getMonth() === month && 
                    selectedDate.getFullYear() === year) {
                    dayCell.classList.add('selected');
                }
                
                dayCell.addEventListener('click', () => {
                    selectedDate = cellDate;
                    renderCalendar();
                    validateStep();
                });
            }
            grid.appendChild(dayCell);
        }
    }

    // Ouvintes de Eventos (Fase 3: Resumo)
    const setupSummaryEditListeners = () => {
        document.querySelectorAll('.summary-edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const step = parseInt(btn.getAttribute('data-step'), 10);
                if (step >= 1 && step <= 2) {
                    currentStep = step;
                    updateStepUI();
                }
            });
        });
    };

    const btnSummaryUrlAdd = document.getElementById('btnSummaryUrlAdd');
    const summaryUrlInput = document.getElementById('summaryUrlInput');
    
    const addSummaryUrl = (linkVal) => {
        let url = linkVal.trim();
        if (!url) return;
        
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        if (isMultiTattoo) {
            if (!selectedLinks.includes(url)) {
                selectedLinks.push(url);
            }
        } else {
            selectedLinks = [url];
        }
        renderPreviews();
    };

    if (btnSummaryUrlAdd && summaryUrlInput) {
        btnSummaryUrlAdd.addEventListener('click', () => {
            addSummaryUrl(summaryUrlInput.value);
            summaryUrlInput.value = '';
        });
        
        summaryUrlInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSummaryUrl(summaryUrlInput.value);
                summaryUrlInput.value = '';
            }
        });
    }

    function updateSummaryPhotosText() {
        const sumPhotos = document.getElementById('sumPhotos');
        if (sumPhotos) {
            if (selectedLinks.length === 0) {
                sumPhotos.textContent = 'Nenhuma';
            } else if (selectedLinks.length === 1) {
                sumPhotos.textContent = '1 imagem';
            } else {
                sumPhotos.textContent = `${selectedLinks.length} imagens`;
            }
        }
    }

    function renderSummaryPreviews() {
        const container = document.getElementById('summaryPreviewsContainer');
        if (!container) return;
        container.innerHTML = '';
        
        if (selectedLinks.length === 0) {
            container.style.display = 'none';
            return;
        }
        
        container.style.display = 'flex';
        container.style.flexWrap = 'wrap';
        container.style.gap = '8px';
        
        selectedLinks.forEach((link, index) => {
            const item = document.createElement('div');
            item.className = 'summary-preview-item';
            item.style.position = 'relative';
            item.style.width = '50px';
            item.style.height = '50px';
            item.style.border = '1px solid rgba(231, 243, 226, 0.3)';
            item.style.borderRadius = '4px';
            item.style.overflow = 'hidden';
            
            const img = document.createElement('img');
            img.src = link;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            
            const placeholder = document.createElement('div');
            placeholder.textContent = '🔗';
            placeholder.style.width = '100%';
            placeholder.style.height = '100%';
            placeholder.style.background = 'rgba(231, 243, 226, 0.1)';
            placeholder.style.display = 'none';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.fontSize = '16px';

            img.onerror = () => {
                img.style.display = 'none';
                placeholder.style.display = 'flex';
            };
            
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.innerHTML = '&times;';
            removeBtn.style.position = 'absolute';
            removeBtn.style.top = '2px';
            removeBtn.style.right = '2px';
            removeBtn.style.background = 'rgba(0, 0, 0, 0.7)';
            removeBtn.style.color = '#fff';
            removeBtn.style.border = 'none';
            removeBtn.style.borderRadius = '50%';
            removeBtn.style.width = '16px';
            removeBtn.style.height = '16px';
            removeBtn.style.display = 'flex';
            removeBtn.style.alignItems = 'center';
            removeBtn.style.justifyContent = 'center';
            removeBtn.style.fontSize = '10px';
            removeBtn.style.cursor = 'pointer';
            
            removeBtn.addEventListener('click', (evt) => {
                evt.stopPropagation();
                selectedLinks.splice(index, 1);
                renderPreviews();
            });
            
            item.appendChild(img);
            item.appendChild(placeholder);
            item.appendChild(removeBtn);
            container.appendChild(item);
        });
    }

    // Ações de Confirmação Final
    const btnConfirmSubmit = document.getElementById('btnConfirmSubmit');
    const btnConfirmWhatsapp = document.getElementById('btnConfirmWhatsapp');
    const WHATSAPP_NUMBER = "5511999999999"; // Substitua pelo seu telefone destinatário

    if (btnConfirmSubmit) {
        btnConfirmSubmit.addEventListener('click', () => {
            currentStep = 4;
            updateStepUI();
        });
    }

    if (btnConfirmWhatsapp) {
        btnConfirmWhatsapp.addEventListener('click', () => {
            const dateStr = selectedDate ? selectedDate.toLocaleDateString('pt-BR') : '';
            const msg = `Olá! Gostaria de confirmar meu agendamento:\n- Local: ${selectedBodyParts.join(', ')}\n- Mais de uma tattoo: ${isMultiTattoo ? 'Sim' : 'Não'}\n- Links de referência:\n${selectedLinks.join('\n')}\n- Data/Hora: ${dateStr} às ${selectedTimeSlot}\n- Nome: ${custName}\n- Telefone: ${custPhone}\n- Email: ${custEmail}`;
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
            
            currentStep = 4;
            updateStepUI();
        });
    }

    // 4. Controle de Fluxo & Validação
    function validateStep() {
        let isValid = false;
        
        if (currentStep === 1) {
            isValid = selectedBodyParts.length > 0;
        } else if (currentStep === 2) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = selectedDate !== null && 
                      selectedTimeSlot !== null && 
                      custName.length > 1 && 
                      custPhone.length > 7 && 
                      emailRegex.test(custEmail);
        } else if (currentStep === 3) {
            isValid = true;
        }
        
        btnNext.disabled = !isValid;
    }

    function updateStepUI() {
        [phase1, phase2, phase3, phaseSuccess].forEach(p => p.classList.remove('active'));
        
        if (currentStep === 1) {
            phase1.classList.add('active');
            btnBack.style.visibility = 'hidden';
            btnNext.textContent = 'Avançar';
            btnNext.style.display = 'block';
            buttonsArea.style.display = 'flex';
        } else if (currentStep === 2) {
            phase2.classList.add('active');
            btnBack.style.visibility = 'visible';
            btnNext.textContent = 'Avançar';
            btnNext.style.display = 'block';
            buttonsArea.style.display = 'flex';
            renderCalendar();
        } else if (currentStep === 3) {
            phase3.classList.add('active');
            btnBack.style.visibility = 'visible';
            btnNext.style.display = 'none';
            buttonsArea.style.display = 'flex';
            
            document.getElementById('sumTatoo').textContent = selectedBodyParts.join(', ');
            document.getElementById('sumMulti').textContent = isMultiTattoo ? 'Sim' : 'Não';
            updateSummaryPhotosText();
            renderSummaryPreviews();
            setupSummaryEditListeners();
            
            const dateStr = selectedDate ? selectedDate.toLocaleDateString('pt-BR') : '';
            document.getElementById('sumDateTime').textContent = `${dateStr} às ${selectedTimeSlot}`;
            document.getElementById('sumName').textContent = custName;
        } else if (currentStep === 4) {
            phaseSuccess.classList.add('active');
            buttonsArea.style.display = 'none';
        }
        
        validateStep();
    }

    btnNext.addEventListener('click', () => {
        if (currentStep < 3) {
            currentStep++;
            updateStepUI();
        }
    });

    btnBack.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepUI();
        }
    });

    // 5. Abrir / Fechar Modal
    function openModal() {
        // Reset state
        currentStep = 1;
        selectedBodyParts = [];
        isMultiTattoo = false;
        selectedLinks = [];
        selectedDate = null;
        selectedTimeSlot = null;
        custName = "";
        custPhone = "";
        custEmail = "";
        
        // Reset UI
        document.querySelectorAll('.body-part-card').forEach(c => c.classList.remove('selected'));
        multiTattooCheck.checked = false;
        urlInput.value = '';
        uploadPreviewsContainer.innerHTML = '';
        uploadPreviewsContainer.style.display = 'none';
        urlInputArea.style.display = 'flex';
        inputName.value = '';
        inputPhone.value = '';
        inputEmail.value = '';
        document.querySelectorAll('.time-slot-btn').forEach(s => s.classList.remove('selected'));
        
        updateStepUI();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Expor globalmente para uso externo
    window.openBookingModal = openModal;

    // 6. Interceptar links com "agendamento" / "booking" no texto ou href
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('a').forEach(link => {
            const text = link.textContent.toLowerCase();
            const href = (link.getAttribute('href') || '').toLowerCase();
            if (text.includes('agendamento') || href.includes('agendamento') || href.includes('booking')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    openModal();
                });
            }
        });
    });

    // Interceptar links de agendamento que já existem no DOM antes do DOMContentLoaded
    document.querySelectorAll('a').forEach(link => {
        const text = link.textContent.toLowerCase();
        const href = (link.getAttribute('href') || '').toLowerCase();
        if (text.includes('agendamento') || href.includes('agendamento') || href.includes('booking')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        }
    });

    // 7. Chat de Suporte Flutuante
    const chatButton = document.getElementById('chatWidgetButton');
    const chatWindow = document.getElementById('chatWidgetWindow');
    const chatClose = document.getElementById('chatWidgetClose');
    const chatInput = document.getElementById('chatWidgetInput');
    const chatSend = document.getElementById('chatWidgetSend');
    const chatBody = document.getElementById('chatWidgetBody');

    chatButton.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            chatInput.focus();
        }
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    function sendChatMessage() {
        const msg = chatInput.value.trim();
        if (!msg) return;
        
        const CHAT_WHATSAPP = WHATSAPP_NUMBER;
        const url = `https://wa.me/${CHAT_WHATSAPP}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
        chatInput.value = '';
    }

    chatSend.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
    });

    // Interceptar cliques nos itens do carrosel para evitar redirecionamento e erros 404
    function setupCarouselInterceptors() {
        document.addEventListener('click', (e) => {
            // Verifica se o clique ocorreu dentro de um .visuals-item
            const visualsItem = e.target.closest('.visuals-item');
            if (visualsItem) {
                // Impede o redirecionamento
                e.preventDefault();
                e.stopPropagation();
                
                // Se for a segunda imagem (Sophia), abre o agendamento
                if (visualsItem.getAttribute('data-slug') === 'sophia') {
                    openModal();
                }
            }
        }, true); // useCapture = true para interceptar antes de outros scripts
    }

    setupCarouselInterceptors();

})();
