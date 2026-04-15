  (function hiCourseComponent(){
          // 데이터 (요청에 따라 완전 교체)
          // 새로운 과정명 및 캡슐 라벨 커스텀 (예시)
          const hi_courses = [
            // 영어
            {lang:'영어',level:'1Lv',name:'영어회화 입문',capsule:'입문',book:'HiFive 1',target:'영어를 기초부터 다시 시작하는 학습자, 영어 발화에 익숙하지 않은 입문자',goal:'회화에 필요한 기초 문법을 익히고, 한 문장 단위의 간단한 표현을 말할 수 있도록 훈련',content:['be동사 활용 기초','시제 변화 기초','현재완료 표현','수여동사, 지각동사, 동명사, to부정사','자기소개, 감정·상태 표현, 경험 말하기, 부탁하기'],effect:['영어 말하기에 대한 심리적 장벽 완화','기초 문장 구조 이해','간단한 일상 표현 발화 가능']},
            {lang:'영어',level:'2Lv',name:'영어회화 초급',capsule:'초급',book:'HiFive 2',target:'기초 문법을 어느 정도 학습했으며, 더 다양한 표현 확장이 필요한 초급 학습자',goal:'여러 상황에서 자주 쓰는 동사와 구문을 익혀 영어 표현을 습관처럼 말할 수 있도록 훈련',content:['do / be / get / make','have / give / put / take','go / come','전치사 on / off','권유하기, 과거 경험 말하기, 통근 설명, 길 안내, 이유 설명'],effect:['단순 암기식 표현에서 벗어나 상황별 응용 가능','실생활 대화에서 활용 가능한 표현력 확대','초급 단계에서의 말하기 자신감 강화']},
            {lang:'영어',level:'3Lv',name:'생활영어 1',capsule:'생활영어1',book:'English Spectrum 1',target:'기초 문법과 어휘를 익힌 뒤, 보다 자연스러운 생활영어 회화를 원하는 학습자',goal:'다양한 생활 상황에서 영어로 능숙하게 대화할 수 있는 기반 마련',content:['가족, 휴일, 결혼, 감정, 성격, 외모, 날씨, 쇼핑 등 생활 주제','I used to~, I should’ve~, I wonder why~ 등 원어민이 자주 쓰는 표현','가족 이야기, 조문 상황, 약속 잡기, 캠핑 여행 등 롤플레이'],effect:['일상적·사회적 상황에서 자연스러운 말하기 가능','패턴 중심 회화 응용력 향상','생활영어 친숙도 상승']},
            {lang:'영어',level:'3Lv',name:'생활영어 2',capsule:'생활영어2',book:'English Spectrum 2',target:'해외 출장, 여행, 외부 방문 등 실제 이동 상황에서 영어가 필요한 학습자',goal:'공항 출국부터 현지 체류, 미팅 전후 상황까지 실제 이동형 커뮤니케이션에 대응',content:['공항, 호텔, 식당, 길 찾기, 지하철, 은행, 병원, 분실물센터, 문화생활','You only need to~, There’s no way~, That’s why~, Do you want me to~ 등 실전 구문','출국, 예약, 주문, 길 묻기, 편의시설 이용, 문화활동 관련 대화'],effect:['해외 출장·여행 시 필요한 기본 회화 대응 가능','현장 상황 대처력 향상','이동·체류 관련 영어 실용성 강화']},
            {lang:'영어',level:'3Lv',name:'뉴스영어',capsule:'뉴스영어',book:'AUDISAY',target:'영어로 시사 이슈를 읽고 의견을 말할 수 있는 수준까지 확장하고 싶은 직장인·임원',goal:'뉴스 기반 읽기와 토론을 통해 시사 영어 이해력과 의견 표현력 강화',content:['Summary로 주제 워밍업','Key Vocabulary 학습','Reading Passage 독해','Quiz를 통한 유의어 확장','Discussion Questions 기반 토론','Audio File 활용 청취 훈련'],effect:['시사 주제 이해도 향상','어휘 확장 및 논리적 의견 제시 능력 강화','임원 대상 고급 토론 수업에 적합']},
            {lang:'영어',level:'4Lv',name:'비즈영어 1',capsule:'비즈영어1',book:'Business Pioneer Office',target:'사무실·고객응대·전화·회의·PT 등 업무 현장에서 영어 사용이 필요한 직장인',goal:'사무 환경에서 발생하는 주요 업무 상황을 영어로 처리할 수 있도록 훈련',content:['Socializing, Telephoning, Meeting, Presentation','고객 환영, 자기소개, 안내, 전화 연결, 메시지 받기, 일정 조정','회의 준비, 의견 교환, 동의·비동의 표현','PT 시작, 목적 소개, 비교·강조, 시각자료 활용, 마무리'],effect:['기본적인 업무용 영어 커뮤니케이션 수행 가능','고객 응대, 전화, 회의, 발표의 핵심 표현 습득','사내외 커뮤니케이션 자신감 향상']},
            {lang:'영어',level:'4Lv',name:'비즈영어 2',capsule:'비즈영어2',book:'Business Pioneer Job',target:'직무별·산업별 업무 주제에 맞춘 비즈니스 영어가 필요한 학습자',goal:'직무 특성과 비즈니스 공통 주제를 동시에 다루며 업무 관련 회화 능력 강화',content:['HR, Finance, Sales, Marketing','Production, Quality Control, Materials, R&D','Technical Issues, Company, Careers, Products, Conflicts, Collaboration, Culture','직무별 대화, 공통 비즈니스 이슈, 주제별 롤플레이','사전·중간·최종 평가 연계'],effect:['업무 주제에 대한 영어 표현력 확대','직무 기반 회화 적응력 강화','실무 대화와 토론 능력 향상']},
            {lang:'영어',level:'4Lv',name:'뉴스영어',capsule:'뉴스영어',book:'AUDISAY',target:'영어로 시사 이슈를 읽고 의견을 말할 수 있는 수준까지 확장하고 싶은 직장인·임원',goal:'뉴스 기반 읽기와 토론을 통해 시사 영어 이해력과 의견 표현력 강화',content:['Summary로 주제 워밍업','Key Vocabulary 학습','Reading Passage 독해','Quiz를 통한 유의어 확장','Discussion Questions 기반 토론','Audio File 활용 청취 훈련'],effect:['시사 주제 이해도 향상','어휘 확장 및 논리적 의견 제시 능력 강화','임원 대상 고급 토론 수업에 적합']},
            {lang:'영어',level:'5Lv',name:'미팅영어',capsule:'미팅영어',book:'Business Interaction Meeting',target:'영어 회의에 참여하거나 회의를 주관해야 하는 중급~고급 학습자',goal:'영어 회의에서 의견을 조리 있게 말하고, 회의 흐름을 이끌 수 있는 역량 강화',content:['회의 시작, 절차 안내, 아젠다 설명, 의견 요청','의견 진술, 명확화, 동의, 반대, 진행, 첨언','투표 제안, 의사결정 보류, 결정 확인, 요약, 회의 종료','Actual Case Study 기반 토론'],effect:['회의 참여와 주관 능력 향상','의견 제시·반대·정리 등 회의 핵심 기능 강화','글로벌 회의 대응력 향상']},
            {lang:'영어',level:'5Lv',name:'유튜브영어',capsule:'유튜브영어',book:'VOX ENGLISH',target:'흥미로운 글로벌 주제를 영어 영상으로 학습하고 대화하고 싶은 직장인·임원',goal:'영상 콘텐츠를 활용해 듣기·어휘·표현·토론 능력을 통합적으로 향상',content:['Heads Up으로 주제 예열','유튜브 영상 시청','Vocabulary 복습 및 정의 찾기','Micro-listening으로 핵심 표현 익히기','Fill in the Blank, Quiz, Discussion'],effect:['영상 기반 청취 적응력 향상','실제 글로벌 이슈에 대한 대화 능력 강화','흥미도 높은 콘텐츠를 통한 학습 지속성 확보']},
            {lang:'영어',level:'6Lv',name:'피티영어',capsule:'피티영어',book:'Business Interaction Presentation',target:'영어 발표 및 PT 준비, 발표자료 설명, 질의응답 대응이 필요한 학습자',goal:'약 5분 내외의 영어 PT를 스스로 준비하고 발표할 수 있는 수준까지 훈련',content:['발표 시작, 청중 참여 유도, 목적 제시, 구조 설명','분석, 비교, 대조, 강조 표현','시각자료 소개, 선그래프·원그래프·막대그래프 설명','Actual Case 분석, PT 스크립트 작성, 시연 및 평가','사전·사후 PT 영상 비교 평가'],effect:['발표 구조화 능력 향상','시각자료 설명 능력 강화','발표 전달력과 Q&A 대응력 향상']},
            {lang:'영어',level:'6Lv',name:'이메일영어',capsule:'이메일영어',book:'Business Interaction E-mail',target:'비즈니스 이메일, 회의록, 보고, 계약 관련 Writing이 필요한 학습자',goal:'실제 업무에 필요한 영문 문서 작성 능력 향상',content:['홍보메일, 샘플 요청/발송, 견적 요청/발송','불만 제기, 사과 메일, 제안 거절','공지, 서비스 중단 안내, 보고서 제출, 회의 일정 조율','회의록, 후속 메일, Executive Summary, 계약 통보, 감사 메일','예문 분석 → 작성 → 첨삭 → 재작성 구조'],effect:['실무형 영문 이메일 작성 역량 향상','문서의 형식성과 정확성 강화','업무 커뮤니케이션 Writing 품질 향상']},
            {lang:'영어',level:'6Lv',name:'유튜브영어',capsule:'유튜브영어',book:'VOX ENGLISH',target:'흥미로운 글로벌 주제를 영어 영상으로 학습하고 대화하고 싶은 직장인·임원',goal:'영상 콘텐츠를 활용해 듣기·어휘·표현·토론 능력을 통합적으로 향상',content:['Heads Up으로 주제 예열','유튜브 영상 시청','Vocabulary 복습 및 정의 찾기','Micro-listening으로 핵심 표현 익히기','Fill in the Blank, Quiz, Discussion'],effect:['영상 기반 청취 적응력 향상','실제 글로벌 이슈에 대한 대화 능력 강화','흥미도 높은 콘텐츠를 통한 학습 지속성 확보']},
            // 중국어 (캡슐: '입문', '초급', '중급', '비즈니스', '실전', '마스터')
            {lang:'중국어',level:'1Lv',name:'중국어 입문',capsule:'입문',book:'끝장 중국어 – 기초',target:'중국어를 처음 배우는 입문자 / 기초부터 다시 시작하는 학습자',goal:'성조·발음 등 중국어 기초 체계 이해, 기본 문장 구조와 기초 회화 습득, 일상적인 간단한 대화 가능',content:['성조, 발음, 문자 구조','인칭대명사, 의문문, 양사','자기소개, 기본 정보 질문','주변 상황 묻고 답하기','기초 발음 + 회화 입문'],effect:['기초 발음 및 회화 입문']},
            {lang:'중국어',level:'2Lv',name:'중국어 초급',capsule:'초급',book:'끝장 중국어 – 기초',target:'중국어를 처음 배우는 입문자 / 기초부터 다시 시작하는 학습자',goal:'성조·발음 등 중국어 기초 체계 이해, 기본 문장 구조와 기초 회화 습득, 일상적인 간단한 대화 가능',content:['성조, 발음, 문자 구조','인칭대명사, 의문문, 양사','자기소개, 기본 정보 질문','주변 상황 묻고 답하기','기초 발음 + 회화 입문'],effect:['기초 발음 및 회화 입문']},
            {lang:'중국어',level:'3Lv',name:'중국어 중급',capsule:'중급',book:'끝장 중국어 – 생활회화',target:'기초 중국어 학습 완료자 / 일상 회화 확장이 필요한 학습자',goal:'일상생활에서 자연스러운 중국어 회화 가능, 다양한 상황에서 의사 표현 능력 향상',content:['쇼핑, 결제, 이동, 시간 표현','경험·상황 설명','조동사, 부사, 전치사 활용','길 안내, 구매, 질문 표현','생활 중심 실전 회화'],effect:['생활 중심 실전 회화']},
            {lang:'중국어',level:'4Lv',name:'비즈니스 중국어',capsule:'비즈니스',book:'끝장 중국어 – 오피스 회화',target:'중국 현지 직원·거래처와 소통이 필요한 직장인',goal:'기본적인 비즈니스 회화 수행, 사무 환경에서 필요한 커뮤니케이션 가능',content:['인사, 자기소개, 명함 교환','일정 조정, 업무 요청','식사 약속, 업무 협의','영수증 처리, 사무 대화','업무 기본 중국어'],effect:['업무 기본 중국어']},
            {lang:'중국어',level:'5Lv',name:'중국어 실전',capsule:'실전',book:'끝장 중국어 – 오피스 회화',target:'중국 현지 직원·거래처와 소통이 필요한 직장인',goal:'기본적인 비즈니스 회화 수행, 사무 환경에서 필요한 커뮤니케이션 가능',content:['인사, 자기소개, 명함 교환','일정 조정, 업무 요청','식사 약속, 업무 협의','영수증 처리, 사무 대화','업무 기본 중국어'],effect:['업무 기본 중국어']},
            {lang:'중국어',level:'6Lv',name:'중국어 마스터',capsule:'마스터',book:'끝장 중국어 – 주재원 과정',target:'중국 주재원 / 중국 비즈니스 담당자',goal:'중국어로 업무 수행 및 회의 참여, 협상 및 출장 상황 대응',content:['가격 협상, 거래 조건 협의','출장 일정, 항공·호텔 예약','시장 조사, 영업 전략','회의, 계약, 문제 해결','비즈니스 실전 대응'],effect:['비즈니스 실전 대응']},
            // 일본어 (캡슐: '입문', '초급', '중급', '비즈니스', '실전', '마스터')
            {lang:'일본어',level:'1Lv',name:'일본어 입문',capsule:'입문',book:'끝장 일본어',target:'일본어를 처음 배우는 직장인 / 일본 업무 입문자',goal:'일본어 기초 문법 및 표현 이해, 일상 및 간단한 업무 회화 가능',content:['인사, 가족, 직장, 날씨','전화, 출장, 호텔, 공항','회의, 협상, 쇼핑, 식당','동사 활용, 형용사, 조사','일본 업무 기초 대응'],effect:['일본 업무 기초 대응']},
            {lang:'일본어',level:'2Lv',name:'일본어 초급',capsule:'초급',book:'끝장 일본어',target:'일본어를 처음 배우는 직장인 / 일본 업무 입문자',goal:'일본어 기초 문법 및 표현 이해, 일상 및 간단한 업무 회화 가능',content:['인사, 가족, 직장, 날씨','전화, 출장, 호텔, 공항','회의, 협상, 쇼핑, 식당','동사 활용, 형용사, 조사','일본 업무 기초 대응'],effect:['일본 업무 기초 대응']},
            {lang:'일본어',level:'3Lv',name:'일본어 중급',capsule:'중급',book:'끝장 일본어',target:'일본어로 비즈니스 상황에 대응해야 하는 직장인',goal:'비즈니스 상황에서 필요한 일본어 표현과 커뮤니케이션 능력 강화',content:['비즈니스 회화','이메일 작성','전화 응대','회의, 협상, 보고','비즈니스 문서 작성'],effect:['비즈니스 일본어 실무 대응']},
            {lang:'일본어',level:'4Lv',name:'비즈니스 일본어',capsule:'비즈니스',book:'끝장 일본어',target:'일본어로 비즈니스 상황에 대응해야 하는 직장인',goal:'비즈니스 상황에서 필요한 일본어 표현과 커뮤니케이션 능력 강화',content:['비즈니스 회화','이메일 작성','전화 응대','회의, 협상, 보고','비즈니스 문서 작성'],effect:['비즈니스 일본어 실무 대응']},
            {lang:'일본어',level:'5Lv',name:'일본어 실전',capsule:'실전',book:'끝장 일본어',target:'고급 일본어 실무가 필요한 직장인',goal:'고급 비즈니스 상황에서의 일본어 커뮤니케이션 능력 강화',content:['고급 회화','고급 비즈니스 문서 작성','고급 협상, 보고, 프레젠테이션','고급 이메일, 전화','고급 비즈니스 매너'],effect:['고급 비즈니스 일본어 실무 대응']},
            {lang:'일본어',level:'6Lv',name:'일본어 마스터',capsule:'마스터',book:'끝장 일본어',target:'고급 일본어 실무가 필요한 직장인',goal:'고급 비즈니스 상황에서의 일본어 커뮤니케이션 능력 강화',content:['고급 회화','고급 비즈니스 문서 작성','고급 협상, 보고, 프레젠테이션','고급 이메일, 전화','고급 비즈니스 매너'],effect:['고급 비즈니스 일본어 실무 대응']},
            // 기타 (캡슐: '입문', '초급', '중급')
            {lang:'기타',level:'1Lv',name:'한국어',capsule:'한국어',book:'세종 한국어 1',target:'한국어를 처음 배우는 외국인',goal:'기초 한국어 습득 및 일상 표현 이해',content:['인사','숫자','기본 문장','일상 회화'],effect:['기초 한국어 회화 가능']},
            {lang:'기타',level:'1Lv',name:'베트남어',capsule:'베트남어',book:'끝장 베트남어',target:'베트남 업무 및 출장 예정자',goal:'기본 회화 및 업무 표현 습득, 현지 생활 및 업무 대응',content:['발음, 성조, 문자','자기소개, 전화 응대','예약, 일정, 이동','상품 설명, 가격 협상'],effect:['현지 실무 대응']},
            {lang:'기타',level:'1Lv',name:'인니어',capsule:'인니어',book:'끝장 인도네시아어',target:'인도네시아 사업 담당자 / 해외 파견 인력',goal:'일상 및 기본 비즈니스 회화 가능, 현지 업무 대응력 확보',content:['문자·발음, 의문사','전화, 예약, 일정 조율','길 찾기, 주문, 협상','상품 설명, 거래 대화'],effect:['현지 커뮤니케이션 대응']},
            {lang:'기타',level:'1Lv',name:'스페인어',capsule:'스페인어',book:'끝장 스페인어',target:'중남미·스페인권 업무 담당자',goal:'기본 회화 및 업무 표현 습득, 현지 생활 및 비즈니스 대응',content:['발음, 기초 문법','전화, 예약, 일정 관리','회의, 식당, 병원, 은행','사교 및 문화 표현'],effect:['글로벌 시장 대응']},
            {lang:'기타',level:'2Lv',name:'한국어 초급',capsule:'초급',book:'세종 한국어 1',target:'한국어를 처음 배우는 외국인',goal:'기초 한국어 습득 및 일상 표현 이해',content:['인사','숫자','기본 문장','일상 회화'],effect:['기초 한국어 회화 가능']},
            {lang:'기타',level:'3Lv',name:'한국어 중급',capsule:'중급',book:'세종 한국어 3',target:'한국어 중급 학습자',goal:'중급 한국어 회화 및 실무 표현 습득',content:['중급 문법','실무 회화','비즈니스 표현','문화 이해'],effect:['중급 한국어 실무 대응']},
          ];
          const hi_langs = ['영어','중국어','일본어','기타'];
          const hi_levels = ['1Lv','2Lv','3Lv','4Lv','5Lv','6Lv'];
          // 상태
          let hi_selectedLang = '영어';
          let hi_selectedLevel = '1Lv';
          let hi_index = 0;
          // DOM
          const root = document.getElementById('hi-course');
          // 렌더 함수
          function hiRender(){
            // 필터
            const filtered = hi_courses.filter(c=>c.lang===hi_selectedLang && c.level===hi_selectedLevel);
            if(hi_index>=filtered.length) hi_index=0;
            if(hi_index<0) hi_index=filtered.length-1;
            // 언어 버튼
            let langBtns = hi_langs.map(lang=>`<button type="button" class="hi-lang-btn${lang===hi_selectedLang?' hi-active':''}" data-lang="${lang}">${lang}</button>`).join('');
            // 레벨 버튼
            let levelBtns = hi_levels.map(lv=>`<button type="button" class="hi-level-btn${lv===hi_selectedLevel?' hi-active':''}" data-level="${lv}">${lv}</button>`).join('');
            // 과정 캡슐 (같은 레벨에 여러 과정, 커스텀 라벨)
            let courseCapsules = '';
            if (filtered.length > 1) {
              courseCapsules = `<div class="hi-course-capsules">${filtered.map((c, idx) => `
                <button type="button" class="hi-course-capsule${hi_index===idx?' hi-active':''}" data-idx="${idx}">${c.capsule || c.name}</button>
              `).join('')}</div>`;
            }

            // 카드
            let card = filtered.length ? `
              <div class="hi-card-outer">
                <div class="hi-card">
                  ${courseCapsules}
                  <div class="hi-card-title" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${filtered[hi_index].name}</div>
                  <div class="hi-card-section"><strong>교재</strong>${filtered[hi_index].book || '-'}</div>
                  <div class="hi-card-section"><strong>대상</strong>${filtered[hi_index].target || '-'}</div>
                  <div class="hi-card-section"><strong>목표</strong>${filtered[hi_index].goal || '-'}</div>
                  <div class="hi-card-section"><strong>주요 내용</strong><ul>${(filtered[hi_index].content||[]).slice(0,3).map(x=>`<li>${x}</li>`).join('')}</ul></div>
                  <div class="hi-card-section"><strong>기대효과</strong><ul>${(filtered[hi_index].effect||[]).map(x=>`<li>${x}</li>`).join('')}</ul></div>
                </div>
              </div>
            ` : `<div style=\"padding:40px 0;text-align:center;color:#888;\">해당 과정이 없습니다.</div>`;
            // 슬라이드 화살표 항상 보이게
            let arrows = `
              <div class="hi-slide-arrows">
                <button type="button" class="hi-arrow-btn" id="hi-arrow-prev" aria-label="이전 과정"${filtered.length<=1?' disabled':''}>◀</button>
                <button type="button" class="hi-arrow-btn" id="hi-arrow-next" aria-label="다음 과정"${filtered.length<=1?' disabled':''}>▶</button>
              </div>
            `;
            // 전체 구조
            root.innerHTML = `
              <div class="hi-filter-row">
                <div class="hi-lang-group">${langBtns}</div>
                ${arrows}
              </div>
              <div class="hi-main-row">
                <div class="hi-card-area">${card}</div>
                <div class="hi-level-group">${levelBtns}</div>
              </div>
            `;
            // 이벤트 연결
            // 언어 버튼
            root.querySelectorAll('.hi-lang-btn').forEach(btn=>{
              btn.onclick = function(){ hi_selectedLang = this.dataset.lang; hi_selectedLevel='1Lv'; hi_index=0; hiRender(); };
            });
            // 레벨 버튼
            root.querySelectorAll('.hi-level-btn').forEach(btn=>{
              btn.onclick = function(){ hi_selectedLevel = this.dataset.level; hi_index=0; hiRender(); };
            });
            // 슬라이드
            root.querySelector('#hi-arrow-prev').onclick = function(){
              if(filtered.length>1){ hi_index--; if(hi_index<0)hi_index=filtered.length-1; hiRender(); }
            };
            root.querySelector('#hi-arrow-next').onclick = function(){
              if(filtered.length>1){ hi_index++; if(hi_index>=filtered.length)hi_index=0; hiRender(); }
            };
            // 과정 캡슐 클릭
            root.querySelectorAll('.hi-course-capsule').forEach(btn => {
              btn.onclick = function() {
                hi_index = Number(this.dataset.idx);
                hiRender();
              };
            });
          }
          hiRender();
        })();
        