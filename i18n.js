/* AKK Spices — Multi-language support (English + 22 Scheduled Indian Languages)
   NOTE: Hindi and English have been reviewed carefully. Translations for other
   languages are machine-assisted; for languages with smaller digital presence
   (Santali, Bodo, Dogri, Kashmiri, Manipuri, Sindhi) we recommend a native
   speaker review before heavy promotional use. */

(function () {
  var LANGS = [
    { code: "en", native: "English" },
    { code: "hi", native: "हिंदी" }
  ];

  var T = {}; // filled below per language

  T.en = {
    nav_about:"About", nav_process:"Our Process", nav_journey:"Our Journey", nav_feedback:"Feedback",
    nav_faq:"FAQ", nav_careers:"Careers", nav_contact:"Contact", nav_shop:"SHOP",
    launch_text:'🌿 <strong>Launching Soon</strong> — pre-book now and be the first to taste it',
    notify_me:"Notify me →",
    hero_eyebrow:"NO ADDED COLOUR · NO FILLERS",
    hero_h1:"The taste<br>behind every dish.",
    hero_lede:"AKK Spices makes turmeric, red chilli and dhaniya powder the honest way — rich colour, real aroma, and nothing added. Launching Soon.",
    hero_cta1:"Get launch updates", see_made:"See how it's made", launch_tag_text:"Launching Soon",
    intro_eyebrow:"ABOUT AKK SPICES", intro_h2:"A small, honest spice company",
    intro_p1:"AKK Spices is a home-grown venture based in Samastipur, Bihar, built on one simple idea — spice the way it used to be made, before shortcuts became normal. We grind turmeric, red chilli and dhaniya the traditional way, and pack them without a single gram of added colour or filler.",
    intro_p2:"We're a registered MSME food unit, launching soon — small in scale today, but built to grow the same honest way we started.",
    visit_shop:"Visit our Shop",
    story_eyebrow:"HOW WE MAKE IT", story_h2:"From farm to pack, nothing rushed",
    step1_h:"Selected batch by batch", step1_p:"We choose each batch of turmeric, chilli and coriander for aroma and colour, not just yield.",
    step2_h:"Gently processed", step2_p:"Low-heat processing helps retain the aroma and flavour of the spice.",
    step3_h:"Ground in small batches", step3_p:"Traditional grinding keeps the heat low, so the aroma and flavour stay fresh.",
    step4_h:"Packed fresh, sealed for freshness", step4_p:"Every pack is sealed soon after grinding, with no added colour or preservative.",
    why_eyebrow:"WHAT'S IN THE PACK", why_h2:"What goes into every AKK pack",
    why_p:"No shortcuts. Here is what we keep out of our packs, and what goes in.",
    why_typical_h:"What we keep out",
    why_typical_1:"No rice/corn starch fillers", why_typical_2:"No artificial colour",
    why_typical_3:"No high-heat machine milling", why_typical_4:"No added flavouring",
    why_typical_5:"No preservatives or anti-caking agents",
    why_akk_h:"The AKK Way",
    why_akk_1:"Single-ingredient spice — no fillers added", why_akk_2:"Colour that comes from the spice itself",
    why_akk_3:"Low heat grinding — aroma stays fresh", why_akk_4:"Small batches, packed fresh",
    why_akk_5:"No added preservatives or anti-caking agents",
    founder_eyebrow:"FROM THE FOUNDER", founder_h2:"Why AKK exists",
    founder_p1:"I started AKK Spices the way most kitchens start — watching my own family notice the difference between spice ground fresh at home and the packet on a supermarket shelf. No colour, no shortcuts, just the way it's always been done.",
    founder_p2:"Every pack carries my family's name, and my family is the reason this exists. We're not a big factory yet. We're a small, honest start, and I want every customer to taste that.",
    founder_sign:"— Nitu Kumari, Founder",
    feedback_eyebrow:"YOUR VOICE MATTERS", feedback_h2:"Help us get it right before we launch",
    feedback_p:"We're a brand new, small business — your feedback on our products, packaging or website genuinely shapes what we do next. Tell us what you think.",
    feedback_btn:"Share Feedback on WhatsApp",
    careers_eyebrow:"JOIN US", careers_h2:"We're hiring",
    careers_p:"We're a small, growing team — if you'd like to help build an honest spice brand from the ground up, we'd love to hear from you.",
    career_title:"Marketing Person — Sales", career_loc:"Samastipur District", career_type:"Full-time",
    career_desc:"We're looking for a self-driven marketing &amp; sales person to help AKK Spices reach kirana stores, distributors and customers across Samastipur district. Local market knowledge and willingness to travel within the district preferred.",
    career_apply:"Apply via Email",
    career_title2:"Distributor", career_loc2:"All Districts, Bihar", career_type2:"Partnership",
    career_desc2:"We're onboarding distributors across every district of Bihar to help take AKK Spices to kirana stores and local markets near you. Existing FMCG/grocery distribution network preferred. Mention your district when you apply.",
    career_apply2:"Apply via Email",
    faq_eyebrow:"GOOD TO KNOW", faq_h2:"Frequently asked questions",
    faq_q1:"How long does delivery take?", faq_a1:"Once we launch, orders are usually dispatched within 1–2 business days and arrive in 3–7 business days depending on your location. We'll share delivery updates on WhatsApp.",
    faq_q2:"Do you add any colour or fillers?", faq_a2:"No — we don't add artificial colour, fillers, anti-caking agents or synthetic flavouring. Ingredient details are printed on every pack.",
    faq_q3:"How should I store my spices?", faq_a3:"Keep the pack sealed, away from direct heat and sunlight, and use it before the best-before date printed on the pack.",
    faq_q4:"Do you ship across India?", faq_a4:"Yes, we deliver across India. Delivery charges, if any, are shown at checkout before you pay.",
    faq_q5:"What if I'm not happy with an order?", faq_a5:"If your pack arrives damaged or incorrect, reach out within 7 days of delivery and we'll arrange a replacement or refund — no long forms, just a message.",
    cta_h3:"Be the first to taste it", cta_p:"Turmeric, red chilli and dhaniya powder — launching soon. Message us to get notified the day we go live.",
    footer_brand_p:"Spices made the honest way — no fillers, no shortcuts. The taste behind every dish.",
    foot_terms:"Terms & Conditions", foot_privacy:"Privacy Policy", foot_refund:"Refund & Cancellation", foot_shipping:"Shipping Policy",
    visit_label:"Visitor No.", visit_suffix:"since we launched",
    launch_text_live:"🌿 <strong>We're open!</strong> — order fresh AKK spices now", launch_cta_live:"Shop now →", launch_cta_cart_live:"View cart →", hero_lede_live:"AKK Spices makes turmeric, red chilli and dhaniya powder the honest way — rich colour, real aroma, and nothing added.", hero_cta_live:"Shop now", intro_p2_live:"We're a registered MSME food unit — small in scale today, but built to grow the same honest way we started.", feedback_h2_live:"Help us get it right", faq_a1_live:"Orders are usually dispatched within 1–2 business days and arrive in 3–7 business days depending on your location. We'll share delivery updates on WhatsApp.", cta_p_live:"Turmeric, red chilli and dhaniya powder — fresh packs, ready to order.", foot_touch_live:"Message or call us to order.", ribbon_prebook:"Pre-book", prebook_cta:"Pre-book now →", prebook_hero_cta:"Pre-book now",
    nav_recipes:"Recipes", recipes_eyebrow:"OUR RECIPES", recipes_h1:"Simple recipes, real spice", recipes_lede:"A few everyday recipes that show off what AKK turmeric, red chilli and dhaniya powder can do in your kitchen.", recipe_count:"4 recipes", ing_h:"Ingredients", steps_h:"Method", tag_all3:"All three spices", r1_title:"Haldi Doodh (Turmeric Milk)", r1_desc:"A warm, comforting bedtime drink made with turmeric powder.", r1_meta:"⏱ 10 min · 🍽 Serves 2", r1_i1:"2 cups milk (dairy or plant-based)", r1_i2:"½ tsp AKK Turmeric Powder", r1_i3:"1 small piece jaggery or 1 tsp honey, to taste", r1_i4:"1 pinch black pepper", r1_i5:"¼ tsp ghee (optional)", r1_s1:"Gently heat the milk in a saucepan on a low-medium flame.", r1_s2:"Add the turmeric powder and black pepper and whisk well so there are no lumps.", r1_s3:"Simmer for 3–4 minutes, stirring occasionally.", r1_s4:"Turn off the flame and stir in the jaggery or honey, and ghee if using.", r1_s5:"Pour into cups and serve warm.", r2_title:"Chilli Tadka Dal", r2_desc:"Everyday dal finished with a bold red chilli tempering.", r2_meta:"⏱ 30 min · 🍽 Serves 4", r2_i1:"1 cup toor (arhar) dal, washed", r2_i2:"½ tsp AKK Red Chilli Powder", r2_i3:"¼ tsp turmeric powder and salt, to taste", r2_i4:"2 tbsp ghee or oil", r2_i5:"1 tsp cumin seeds, 2–3 dried red chillies", r2_i6:"3–4 garlic cloves, sliced; 1 tomato, chopped", r2_i7:"Fresh coriander leaves, chopped", r2_s1:"Pressure-cook the dal with turmeric, salt and 3 cups of water until soft (3–4 whistles).", r2_s2:"Heat ghee or oil in a small pan and add the cumin seeds.", r2_s3:"Add dried red chillies and garlic; sauté until golden.", r2_s4:"Stir in the red chilli powder and tomato; cook for 2 minutes.", r2_s5:"Pour this tempering over the dal and simmer for 5 minutes.", r2_s6:"Garnish with coriander and serve hot with rice or roti.", r3_title:"Dhaniya Chutney", r3_desc:"A quick, tangy green chutney for snacks and parathas.", r3_meta:"⏱ 10 min · 🍽 Serves 4", r3_i1:"1 cup fresh coriander leaves", r3_i2:"1 tsp AKK Dhaniya Powder", r3_i3:"2 green chillies, 1 small piece ginger", r3_i4:"1 tbsp roasted chana dal or peanuts", r3_i5:"Juice of ½ lemon, salt to taste", r3_i6:"2–3 tbsp water", r3_s1:"Wash the coriander leaves well and roughly chop them.", r3_s2:"Add coriander, dhaniya powder, green chillies, ginger and chana dal to a blender.", r3_s3:"Add lemon juice, salt and a little water; blend until smooth.", r3_s4:"Adjust water, salt and lemon to taste.", r3_s5:"Serve fresh with snacks, parathas or as a side.", r4_title:"Teen Masala Aloo Sabzi", r4_desc:"A simple potato sabzi that shows how all three spices work together.", r4_meta:"⏱ 30 min · 🍽 Serves 4", r4_i1:"4 medium potatoes, boiled and cubed", r4_i2:"½ tsp AKK Turmeric Powder", r4_i3:"1 tsp AKK Red Chilli Powder", r4_i4:"1 tsp AKK Dhaniya Powder", r4_i5:"2 tbsp oil, 1 tsp cumin seeds", r4_i6:"1 onion and 1 tomato, chopped", r4_i7:"Salt to taste; coriander leaves to garnish", r4_s1:"Heat oil in a pan and add the cumin seeds; let them splutter.", r4_s2:"Add the onion and sauté until light golden.", r4_s3:"Add the tomato, turmeric, red chilli and dhaniya powder; cook until the tomato softens.", r4_s4:"Add the boiled potatoes and salt; mix so the spices coat the potatoes.", r4_s5:"Cook on low flame for 5–7 minutes, stirring occasionally.", r4_s6:"Garnish with coriander and serve with roti or paratha.",
    badge_msme:'<b>MSME Registered</b> · UDYAM-BR-30-0095340', badge_gstin:'<b>GSTIN</b> · 10KCWPK0610J1ZL', badge_fssai:'<b>FSSAI</b> · 20426331000767',
    foot_shop_h:"Shop", foot_turmeric:"Turmeric Powder", foot_chilli:"Red Chilli Powder", foot_dhaniya:"Dhaniya Powder",
    foot_company_h:"Company", foot_contact:"Contact Us", foot_touch_h:"Get in touch",
    foot_touch_p:"Launching Soon — message or call us to get notified.",
    foot_whatsapp:"WhatsApp: 72570 97766", foot_call:"Call: 72570 97766",
    foot_copyright:"© 2026 AKK Spices. All rights reserved.",
    foot_orders:"Orders: order@akkspices.in", foot_enquiries:"Enquiries: info@akkspices.in",
    nav_partner:"Partner", nav_home:"HOME",
    shop_eyebrow:"OUR PRODUCTS", shop_h1:"Choose your size",
    shop_lede:"Packed fresh in small batches — no added colour, no fillers. Pick the size that fits your kitchen.",
    pill_all:"View All", pill_turmeric:"Turmeric", pill_chilli:"Red Chilli", pill_dhaniya:"Dhaniya",
    prod_count:"3 products", toolbar_filter:"Filter", toolbar_sort:"Sort", ribbon_soon:"Coming Soon",
    prod1_title:"Turmeric Powder",
    prod2_title:"Red Chilli Powder",
    prod3_title:"Dhaniya Powder",
    add_to_cart:"Add to Cart", shop_now_btn:"Shop Now",
    popup_title:"Launching Soon!",
    popup_p:"We're putting the final touches on AKK Spices. Shopping opens soon — pre-book now and be the first to taste it.",
    popup_cta:"Notify Me on WhatsApp",
    p_signup_title:"Become a Partner", p_signup_sub:"Register as a Distributor to order AKK Spices at wholesale rates.",
    p_business_name:"Business Name *", p_contact_name:"Contact Person Name *", p_mobile:"Mobile Number *",
    p_email:"Email *", p_password:"Password *", p_password_hint:"At least 6 characters",
    p_select_one:"Select district",
    p_district:"District *", p_district_ph:"e.g. Samastipur", p_gst:"GST Number *", p_gst_ph:"15-character GSTIN",
    p_create_account:"Create Account", p_have_account:"Already have an account?", p_login:"Log in",
    p_login_title:"Welcome back", p_login_sub:"Log in to your Distributor account.",
    p_login_btn:"Log In", p_forgot:"Forgot password?", p_new_partner:"New partner?", p_signup_link:"Create an account",
    p_reset_title:"Reset your password", p_reset_sub:"Enter your email — we'll send you a reset link.",
    p_reset_btn:"Send Reset Link", p_back_login:"Back to login",
    p_home_btn:"← Back to Home",
    p_loading:"Loading your account...",
    p_place_order:"Place an Order", p_price_note:"Prices shown are your wholesale rate. Minimum order quantity applies per line.",
    p_kits_title:"Choose Your Distributor Kit", p_kits_sub:"Pick a kit to see its contents and pay, or build a custom order instead.",
    p_custom_link:"Or build a custom order instead →", p_back_kits:"← Back to Kits",
    p_kit_pay_note:"Kit price includes the opening-stock products and delivery within Bihar. No other charges.",
    p_pay_now:"Pay Now", p_kit_total_label:"Total Billing", p_kit_includes:"Kit includes (with Opening Stock)",
    p_order_total:"Order Total", p_place_order_btn:"Place Order",
    p_order_history:"Your Order History", p_no_orders:"No orders yet.",
    p_logout:"Log out", prod_label:"Product", th_date:"Date", th_items:"Items", th_status:"Status"
  };

  T.hi = {
    nav_about:"परिचय", nav_process:"हमारी प्रक्रिया", nav_journey:"हमारी यात्रा", nav_feedback:"प्रतिक्रिया",
    nav_faq:"सामान्य प्रश्न", nav_careers:"करियर", nav_contact:"संपर्क", nav_shop:"खरीदें",
    launch_text:'🌿 <strong>जल्द लॉन्च हो रहा है</strong> — अभी प्री-बुक करें और सबसे पहले स्वाद चखें',
    notify_me:"मुझे सूचित करें →",
    hero_eyebrow:"बिना रंग मिलावट · बिना फिलर",
    hero_h1:"हर व्यंजन के पीछे<br>का स्वाद।",
    hero_lede:"AKK Spices हल्दी, लाल मिर्च और धनिया पाउडर ईमानदारी से बनाता है — असली रंग, असली खुशबू, कुछ भी मिलाया नहीं। जल्द लॉन्च हो रहा है।",
    hero_cta1:"लॉन्च अपडेट पाएं", see_made:"जानिए कैसे बनता है", launch_tag_text:"जल्द लॉन्च हो रहा है",
    intro_eyebrow:"AKK SPICES के बारे में", intro_h2:"एक छोटी, ईमानदार मसाला कंपनी",
    intro_p1:"AKK Spices समस्तीपुर, बिहार का एक घरेलू उद्यम है — मसाला उसी तरह बनाना जैसे शॉर्टकट अपनाने से पहले बनाया जाता था। हम हल्दी, मिर्च और धनिया पारंपरिक तरीके से पीसकर, बिना किसी रंग या फिलर के पैक करते हैं।",
    intro_p2:"हम एक पंजीकृत MSME खाद्य इकाई हैं, जल्द लॉन्च हो रही है — आज छोटे स्तर पर, लेकिन उसी ईमानदार तरीके से आगे बढ़ने के लिए बनाई गई है।",
    visit_shop:"हमारी दुकान देखें",
    story_eyebrow:"हम कैसे बनाते हैं", story_h2:"खेत से पैक तक, कोई जल्दबाज़ी नहीं",
    step1_h:"बैच-दर-बैच चुना हुआ", step1_p:"हम हल्दी, मिर्च और धनिया के हर बैच को सुगंध और रंग के आधार पर चुनते हैं।",
    step2_h:"हल्की गर्मी में प्रोसेस किया", step2_p:"कम तापमान की प्रक्रिया से मसाले की सुगंध और स्वाद बना रहता है।",
    step3_h:"छोटे बैचों में पिसा हुआ", step3_p:"पारंपरिक पिसाई में गर्मी कम रहती है, इसलिए सुगंध और स्वाद ताज़ा बना रहता है।",
    step4_h:"ताज़ा पैक किया, ताज़गी के लिए सील किया", step4_p:"हर पैक पिसाई के तुरंत बाद सील किया जाता है, बिना अतिरिक्त रंग या परिरक्षक के।",
    why_eyebrow:"पैक में क्या है", why_h2:"हर AKK पैक में क्या जाता है",
    why_p:"कोई शॉर्टकट नहीं। देखिए हम अपने पैक में क्या नहीं डालते, और क्या डालते हैं।",
    why_typical_h:"जो हम नहीं डालते",
    why_typical_1:"चावल/मक्के के स्टार्च का कोई फिलर नहीं", why_typical_2:"कोई कृत्रिम रंग नहीं",
    why_typical_3:"तेज़ गर्मी में मशीन से पिसाई नहीं", why_typical_4:"कोई अतिरिक्त फ्लेवर नहीं",
    why_typical_5:"कोई परिरक्षक या एंटी-केकिंग एजेंट नहीं",
    why_akk_h:"AKK का तरीका",
    why_akk_1:"सिर्फ़ एक सामग्री का मसाला — कोई फिलर नहीं मिलाया", why_akk_2:"रंग मसाले का अपना",
    why_akk_3:"कम गर्मी में पिसाई — सुगंध ताज़ा", why_akk_4:"छोटे बैच, ताज़ा पैक",
    why_akk_5:"कोई अतिरिक्त परिरक्षक या एंटी-केकिंग एजेंट नहीं",
    founder_eyebrow:"संस्थापक की ओर से", founder_h2:"AKK क्यों बना",
    founder_p1:"मैंने AKK Spices की शुरुआत उसी तरह की जैसे ज़्यादातर रसोई से होती है — घर पर ताज़ा पिसे मसाले और पैकेट के फ़र्क को देखकर। कोई रंग नहीं, कोई शॉर्टकट नहीं।",
    founder_p2:"हर पैक मेरे परिवार का नाम लेकर चलता है — मेरा परिवार ही इसकी वजह है। हम एक छोटी, ईमानदार शुरुआत हैं।",
    founder_sign:"— नीतू कुमारी, संस्थापक",
    feedback_eyebrow:"आपकी राय मायने रखती है", feedback_h2:"लॉन्च से पहले हमें सही दिशा में मदद करें",
    feedback_p:"हम एक बिल्कुल नया, छोटा व्यवसाय हैं — आपकी राय हमें आगे की दिशा तय करने में मदद करती है।",
    feedback_btn:"WhatsApp पर फीडबैक भेजें",
    careers_eyebrow:"हमसे जुड़ें", careers_h2:"हम भर्ती कर रहे हैं",
    careers_p:"हम एक छोटी, बढ़ती हुई टीम हैं — अगर आप एक ईमानदार मसाला ब्रांड बनाने में मदद करना चाहें, तो हमें बताएं।",
    career_title:"मार्केटिंग व्यक्ति — बिक्री", career_loc:"समस्तीपुर जिला", career_type:"पूर्णकालिक",
    career_desc:"हमें एक स्वयं-प्रेरित मार्केटिंग एवं बिक्री व्यक्ति चाहिए जो समस्तीपुर जिले भर में किराना दुकानों, वितरकों और ग्राहकों तक AKK Spices पहुंचाए।",
    career_apply:"ईमेल से आवेदन करें",
    career_title2:"वितरक", career_loc2:"सभी जिले, बिहार", career_type2:"साझेदारी",
    career_desc2:"हम बिहार के हर जिले में वितरक जोड़ रहे हैं ताकि AKK Spices आपके नज़दीकी किराना दुकानों तक पहुंच सके। आवेदन करते समय अपना जिला बताएं।",
    career_apply2:"ईमेल से आवेदन करें",
    faq_eyebrow:"जानना ज़रूरी है", faq_h2:"अक्सर पूछे जाने वाले प्रश्न",
    faq_q1:"डिलीवरी में कितना समय लगता है?", faq_a1:"लॉन्च के बाद ऑर्डर आमतौर पर 1-2 कार्यदिवसों में भेज दिए जाते हैं और 3-7 कार्यदिवसों में पहुंचते हैं। डिलीवरी अपडेट WhatsApp पर मिलेंगे।",
    faq_q2:"क्या आप रंग या फिलर मिलाते हैं?", faq_a2:"नहीं — हम कृत्रिम रंग, फिलर, एंटी-केकिंग एजेंट या कृत्रिम फ्लेवर नहीं मिलाते। सामग्री की जानकारी हर पैक पर छपी है।",
    faq_q3:"मसालों को कैसे स्टोर करें?", faq_a3:"पैक को सील रखें, धूप-गर्मी से दूर। पैक पर छपी 'बेस्ट बिफोर' तारीख से पहले उपयोग करें।",
    faq_q4:"क्या आप पूरे भारत में डिलीवरी करते हैं?", faq_a4:"हां, पूरे भारत में। डिलीवरी शुल्क (यदि कोई हो) भुगतान से पहले चेकआउट पर दिखेगा।",
    faq_q5:"अगर ऑर्डर से संतुष्ट नहीं हूं तो?", faq_a5:"अगर पैक खराब या गलत आए, तो डिलीवरी के 7 दिनों के भीतर संपर्क करें — हम रिप्लेसमेंट या रिफंड की व्यवस्था करेंगे।",
    cta_h3:"सबसे पहले स्वाद चखने वाले बनें", cta_p:"हल्दी, मिर्च और धनिया पाउडर — जल्द लॉन्च हो रहा है। सूचना पाने के लिए मैसेज करें।",
    footer_brand_p:"ईमानदारी से बनाए गए मसाले — बिना फिलर, बिना शॉर्टकट। हर व्यंजन के पीछे का स्वाद।",
    foot_terms:"नियम एवं शर्तें", foot_privacy:"गोपनीयता नीति", foot_refund:"रिफंड एवं रद्दीकरण", foot_shipping:"शिपिंग नीति",
    visit_label:"विज़िटर नंबर", visit_suffix:"हमारे लॉन्च होने के बाद से",
    launch_text_live:"🌿 <strong>हम खुल गए हैं!</strong> — ताज़ा AKK मसाले अभी ऑर्डर करें", launch_cta_live:"अभी खरीदें →", launch_cta_cart_live:"कार्ट देखें →", hero_lede_live:"AKK Spices हल्दी, लाल मिर्च और धनिया पाउडर ईमानदारी से बनाता है — असली रंग, असली खुशबू, कुछ भी मिलाया नहीं।", hero_cta_live:"अभी खरीदें", intro_p2_live:"हम एक पंजीकृत MSME खाद्य इकाई हैं — आज छोटे स्तर पर, लेकिन उसी ईमानदार तरीके से आगे बढ़ने के लिए बनाई गई है।", feedback_h2_live:"हमें सही दिशा में मदद करें", faq_a1_live:"ऑर्डर आमतौर पर 1-2 कार्यदिवसों में भेज दिए जाते हैं और 3-7 कार्यदिवसों में पहुंचते हैं। डिलीवरी अपडेट WhatsApp पर मिलेंगे।", cta_p_live:"हल्दी, मिर्च और धनिया पाउडर — ताज़ा पैक, ऑर्डर के लिए तैयार।", foot_touch_live:"ऑर्डर के लिए मैसेज या कॉल करें।", ribbon_prebook:"प्री-बुक", prebook_cta:"अभी प्री-बुक करें →", prebook_hero_cta:"अभी प्री-बुक करें",
    nav_recipes:"रेसिपी", recipes_eyebrow:"हमारी रेसिपी", recipes_h1:"आसान रेसिपी, असली मसाला", recipes_lede:"कुछ रोज़मर्रा की रेसिपी, जो दिखाती हैं कि AKK की हल्दी, लाल मिर्च और धनिया पाउडर आपकी रसोई में क्या कमाल कर सकते हैं।", recipe_count:"4 रेसिपी", ing_h:"सामग्री", steps_h:"विधि", tag_all3:"तीनों मसाले", r1_title:"हल्दी दूध", r1_desc:"हल्दी पाउडर से बना गरमागरम, सुकून देने वाला रात का पेय।", r1_meta:"⏱ 10 मिनट · 🍽 2 लोगों के लिए", r1_i1:"2 कप दूध (डेयरी या प्लांट-बेस्ड)", r1_i2:"½ चम्मच AKK हल्दी पाउडर", r1_i3:"1 छोटा टुकड़ा गुड़ या 1 चम्मच शहद, स्वादानुसार", r1_i4:"1 चुटकी काली मिर्च", r1_i5:"¼ चम्मच घी (वैकल्पिक)", r1_s1:"दूध को पैन में धीमी-मध्यम आँच पर हल्का गरम करें।", r1_s2:"हल्दी पाउडर और काली मिर्च डालकर अच्छी तरह फेंटें ताकि गुठलियाँ न रहें।", r1_s3:"बीच-बीच में चलाते हुए 3–4 मिनट उबालें।", r1_s4:"आँच बंद करके गुड़ या शहद, और चाहें तो घी मिला दें।", r1_s5:"कप में डालकर गरम-गरम परोसें।", r2_title:"मिर्च तड़का दाल", r2_desc:"रोज़ की दाल, जिसमें लाल मिर्च का तेज़ तड़का लगा है।", r2_meta:"⏱ 30 मिनट · 🍽 4 लोगों के लिए", r2_i1:"1 कप तूर (अरहर) दाल, धोई हुई", r2_i2:"½ चम्मच AKK लाल मिर्च पाउडर", r2_i3:"¼ चम्मच हल्दी पाउडर और नमक, स्वादानुसार", r2_i4:"2 चम्मच घी या तेल", r2_i5:"1 चम्मच जीरा, 2–3 सूखी लाल मिर्च", r2_i6:"3–4 लहसुन की कलियाँ, कटी हुई; 1 टमाटर, कटा हुआ", r2_i7:"ताज़ा हरा धनिया, कटा हुआ", r2_s1:"दाल को हल्दी, नमक और 3 कप पानी के साथ प्रेशर कुकर में नरम होने तक (3–4 सीटी) पकाएँ।", r2_s2:"एक छोटे पैन में घी या तेल गरम करके जीरा डालें।", r2_s3:"सूखी लाल मिर्च और लहसुन डालकर सुनहरा होने तक भूनें।", r2_s4:"लाल मिर्च पाउडर और टमाटर डालकर 2 मिनट पकाएँ।", r2_s5:"यह तड़का दाल के ऊपर डालकर 5 मिनट उबालें।", r2_s6:"हरे धनिये से सजाकर चावल या रोटी के साथ गरम परोसें।", r3_title:"धनिया चटनी", r3_desc:"नाश्ते और पराठों के लिए झटपट बनने वाली चटपटी हरी चटनी।", r3_meta:"⏱ 10 मिनट · 🍽 4 लोगों के लिए", r3_i1:"1 कप ताज़ा हरा धनिया", r3_i2:"1 चम्मच AKK धनिया पाउडर", r3_i3:"2 हरी मिर्च, अदरक का 1 छोटा टुकड़ा", r3_i4:"1 बड़ा चम्मच भुनी चना दाल या मूँगफली", r3_i5:"½ नींबू का रस, नमक स्वादानुसार", r3_i6:"2–3 बड़े चम्मच पानी", r3_s1:"हरे धनिये को अच्छी तरह धोकर मोटा-मोटा काट लें।", r3_s2:"धनिया, धनिया पाउडर, हरी मिर्च, अदरक और चना दाल को ब्लेंडर में डालें।", r3_s3:"नींबू का रस, नमक और थोड़ा पानी डालकर चिकना पीस लें।", r3_s4:"पानी, नमक और नींबू स्वादानुसार ठीक करें।", r3_s5:"ताज़ा ही नाश्ते, पराठे या साइड डिश के साथ परोसें।", r4_title:"तीन मसाला आलू सब्ज़ी", r4_desc:"एक आसान आलू की सब्ज़ी, जो दिखाती है कि तीनों मसाले साथ मिलकर कैसे काम करते हैं।", r4_meta:"⏱ 30 मिनट · 🍽 4 लोगों के लिए", r4_i1:"4 मध्यम आलू, उबले और कटे हुए", r4_i2:"½ चम्मच AKK हल्दी पाउडर", r4_i3:"1 चम्मच AKK लाल मिर्च पाउडर", r4_i4:"1 चम्मच AKK धनिया पाउडर", r4_i5:"2 बड़े चम्मच तेल, 1 चम्मच जीरा", r4_i6:"1 प्याज़ और 1 टमाटर, कटे हुए", r4_i7:"नमक स्वादानुसार; सजाने के लिए हरा धनिया", r4_s1:"पैन में तेल गरम करके जीरा डालें और चटकने दें।", r4_s2:"प्याज़ डालकर हल्का सुनहरा होने तक भूनें।", r4_s3:"टमाटर, हल्दी, लाल मिर्च और धनिया पाउडर डालकर टमाटर नरम होने तक पकाएँ।", r4_s4:"उबले आलू और नमक डालकर मिलाएँ ताकि मसाला आलू पर अच्छी तरह लग जाए।", r4_s5:"धीमी आँच पर 5–7 मिनट, बीच-बीच में चलाते हुए पकाएँ।", r4_s6:"हरे धनिये से सजाकर रोटी या पराठे के साथ परोसें।",
    badge_msme:'<b>MSME पंजीकृत</b> · UDYAM-BR-30-0095340', badge_gstin:'<b>GSTIN</b> · 10KCWPK0610J1ZL', badge_fssai:'<b>FSSAI</b> · 20426331000767',
    foot_shop_h:"खरीदें", foot_turmeric:"हल्दी पाउडर", foot_chilli:"लाल मिर्च पाउडर", foot_dhaniya:"धनिया पाउडर",
    foot_company_h:"कंपनी", foot_contact:"संपर्क करें", foot_touch_h:"संपर्क करें",
    foot_touch_p:"जल्द लॉन्च हो रहा है — सूचना पाने के लिए मैसेज या कॉल करें।",
    foot_whatsapp:"WhatsApp: 72570 97766", foot_call:"कॉल: 72570 97766",
    foot_copyright:"© 2026 AKK Spices. सर्वाधिकार सुरक्षित।",
    foot_orders:"ऑर्डर: order@akkspices.in", foot_enquiries:"पूछताछ: info@akkspices.in",
    nav_partner:"पार्टनर", nav_home:"होम",
    shop_eyebrow:"हमारे उत्पाद", shop_h1:"अपना साइज़ चुनें",
    shop_lede:"छोटे बैचों में ताज़ा पैक — बिना रंग, बिना फिलर। अपनी रसोई के हिसाब से साइज़ चुनें।",
    pill_all:"सभी देखें", pill_turmeric:"हल्दी", pill_chilli:"लाल मिर्च", pill_dhaniya:"धनिया",
    prod_count:"3 उत्पाद", toolbar_filter:"फ़िल्टर", toolbar_sort:"क्रमबद्ध करें", ribbon_soon:"जल्द आ रहा है",
    prod1_title:"हल्दी पाउडर",
    prod2_title:"लाल मिर्च पाउडर",
    prod3_title:"धनिया पाउडर",
    add_to_cart:"कार्ट में डालें", shop_now_btn:"अभी खरीदें",
    popup_title:"जल्द लॉन्च हो रहा है!",
    popup_p:"हम AKK Spices को अंतिम रूप दे रहे हैं। जल्द ही खरीदारी शुरू होगी — अभी प्री-बुक करें और सबसे पहले स्वाद चखें।",
    popup_cta:"WhatsApp पर सूचित करें",
    p_signup_title:"पार्टनर बनें", p_signup_sub:"थोक दरों पर AKK Spices ऑर्डर करने के लिए Distributor के रूप में पंजीकरण करें।",
    p_business_name:"व्यवसाय का नाम *", p_contact_name:"संपर्क व्यक्ति का नाम *", p_mobile:"मोबाइल नंबर *",
    p_email:"ईमेल *", p_password:"पासवर्ड *", p_password_hint:"कम से कम 6 अक्षर",
    p_select_one:"जिला चुनें",
    p_district:"जिला *", p_district_ph:"जैसे समस्तीपुर", p_gst:"GST नंबर *", p_gst_ph:"15 अंकों का GSTIN",
    p_create_account:"खाता बनाएं", p_have_account:"पहले से खाता है?", p_login:"लॉग इन करें",
    p_login_title:"वापसी पर स्वागत है", p_login_sub:"अपने Distributor खाते में लॉग इन करें।",
    p_login_btn:"लॉग इन करें", p_forgot:"पासवर्ड भूल गए?", p_new_partner:"नए पार्टनर हैं?", p_signup_link:"खाता बनाएं",
    p_reset_title:"अपना पासवर्ड रीसेट करें", p_reset_sub:"अपना ईमेल डालें — हम आपको रीसेट लिंक भेजेंगे।",
    p_reset_btn:"रीसेट लिंक भेजें", p_back_login:"लॉगिन पर वापस जाएं",
    p_home_btn:"← होम पेज पर वापस जाएं",
    p_loading:"आपका खाता लोड हो रहा है...",
    p_place_order:"ऑर्डर करें", p_price_note:"दिखाई गई कीमतें आपकी थोक दर हैं। हर लाइन पर न्यूनतम ऑर्डर मात्रा लागू होती है।",
    p_kits_title:"अपना डिस्ट्रीब्यूटर किट चुनें", p_kits_sub:"किट के contents और payment देखने के लिए चुनें, या custom order बनाएं।",
    p_custom_link:"या custom order बनाएं →", p_back_kits:"← किट्स पर वापस जाएं",
    p_kit_pay_note:"Kit की कीमत में opening-stock products और बिहार के अंदर delivery शामिल है। कोई अन्य charge नहीं।",
    p_pay_now:"अभी भुगतान करें", p_kit_total_label:"कुल Billing", p_kit_includes:"Kit में शामिल (Opening Stock के साथ)",
    p_order_total:"ऑर्डर कुल राशि", p_place_order_btn:"ऑर्डर करें",
    p_order_history:"आपका ऑर्डर इतिहास", p_no_orders:"अभी तक कोई ऑर्डर नहीं है।",
    p_logout:"लॉग आउट", prod_label:"उत्पाद", th_date:"तारीख", th_items:"सामान", th_status:"स्थिति"
  };

  // ---- Remaining languages: nav + hero + key CTAs translated; rest fall back to English ----
  T.bn = { nav_about:"পরিচিতি", nav_process:"প্রক্রিয়া", nav_journey:"আমাদের যাত্রা", nav_feedback:"মতামত", nav_faq:"প্রশ্নোত্তর", nav_careers:"কর্মসংস্থান", nav_contact:"যোগাযোগ", nav_shop:"কিনুন",
    hero_eyebrow:"১০০% খাঁটি · কোনো রং নেই · কোনো ফিলার নেই", hero_h1:"প্রতিটি পদের<br>পেছনের স্বাদ।",
    hero_lede:"AKK Spices হলুদ, লাল লঙ্কা ও ধনে গুঁড়ো সততার সাথে তৈরি করে — আসল রং, আসল গন্ধ। শীঘ্রই আসছে।",
    hero_cta1:"লঞ্চ আপডেট পান", see_made:"কীভাবে তৈরি হয় দেখুন", launch_tag_text:"শীঘ্রই আসছে", notify_me:"জানান →",
    visit_shop:"আমাদের দোকান দেখুন", feedback_btn:"WhatsApp-এ মতামত পাঠান", career_apply:"ইমেইলে আবেদন করুন", career_apply2:"ইমেইলে আবেদন করুন" };

  T.te = { nav_about:"గురించి", nav_process:"మా ప్రక్రియ", nav_journey:"మా ప్రయాణం", nav_feedback:"అభిప్రాయం", nav_faq:"ప్రశ్నలు", nav_careers:"ఉద్యోగాలు", nav_contact:"సంప్రదించండి", nav_shop:"కొనండి",
    hero_eyebrow:"రంగులు లేవు · ఫిల్లర్లు లేవు", hero_h1:"ప్రతి వంటకం వెనుక<br>ఉన్న రుచి.",
    hero_lede:"AKK Spices పసుపు, ఎర్ర మిర్చి, ధనియాల పొడిని నిజాయితీగా తయారు చేస్తుంది. త్వరలో లాంచ్ అవుతోంది.",
    hero_cta1:"లాంచ్ అప్‌డేట్‌లు పొందండి", see_made:"ఎలా తయారవుతుందో చూడండి", launch_tag_text:"త్వరలో లాంచ్", notify_me:"నాకు తెలియజేయండి →",
    visit_shop:"మా షాప్ చూడండి", feedback_btn:"WhatsApp లో అభిప్రాయం పంపండి", career_apply:"ఇమెయిల్ ద్వారా దరఖాస్తు చేయండి", career_apply2:"ఇమెయిల్ ద్వారా దరఖాస్తు చేయండి" };

  T.mr = { nav_about:"आमच्याबद्दल", nav_process:"आमची प्रक्रिया", nav_journey:"आमचा प्रवास", nav_feedback:"अभिप्राय", nav_faq:"प्रश्न", nav_careers:"करिअर", nav_contact:"संपर्क", nav_shop:"खरेदी करा",
    hero_eyebrow:"रंग नाही · फिलर नाही", hero_h1:"प्रत्येक पदार्थामागील<br>चव.",
    hero_lede:"AKK Spices हळद, लाल मिरची आणि धणे पावडर प्रामाणिकपणे बनवते — खरा रंग, खरा सुगंध. लवकरच लाँच होत आहे.",
    hero_cta1:"लाँच अपडेट्स मिळवा", see_made:"कसे बनते ते पहा", launch_tag_text:"लवकरच लाँच होत आहे", notify_me:"मला कळवा →",
    visit_shop:"आमचे दुकान पहा", feedback_btn:"WhatsApp वर अभिप्राय पाठवा", career_apply:"ईमेलद्वारे अर्ज करा", career_apply2:"ईमेलद्वारे अर्ज करा" };

  T.ta = { nav_about:"எங்களைப் பற்றி", nav_process:"எங்கள் செயல்முறை", nav_journey:"எங்கள் பயணம்", nav_feedback:"கருத்து", nav_faq:"கேள்விகள்", nav_careers:"வேலைவாய்ப்பு", nav_contact:"தொடர்பு", nav_shop:"வாங்க",
    hero_eyebrow:"செயற்கை நிறம் இல்லை · நிரப்பிகள் இல்லை", hero_h1:"ஒவ்வொரு உணவின்<br>பின்னணி சுவை.",
    hero_lede:"AKK Spices மஞ்சள், சிவப்பு மிளகாய், தனியா தூள் நேர்மையாகச் செய்கிறது. விரைவில் தொடங்குகிறோம்.",
    hero_cta1:"தொடக்க தகவல் பெறவும்", see_made:"எப்படி தயாரிக்கிறோம் பாருங்கள்", launch_tag_text:"விரைவில் தொடங்குகிறோம்", notify_me:"எனக்கு தெரியப்படுத்து →",
    visit_shop:"எங்கள் கடையைப் பார்வையிடுங்கள்", feedback_btn:"WhatsApp-இல் கருத்து அனுப்பவும்", career_apply:"மின்னஞ்சல் மூலம் விண்ணப்பிக்கவும்", career_apply2:"மின்னஞ்சல் மூலம் விண்ணப்பிக்கவும்" };

  T.ur = { nav_about:"تعارف", nav_process:"ہمارا عمل", nav_journey:"ہمارا سفر", nav_feedback:"رائے", nav_faq:"سوالات", nav_careers:"ملازمتیں", nav_contact:"رابطہ", nav_shop:"خریدیں",
    hero_eyebrow:"بغیر رنگ · کوئی فلر نہیں", hero_h1:"ہر ڈش کے پیچھے<br>کا ذائقہ۔",
    hero_lede:"AKK Spices ہلدی، لال مرچ اور دھنیا پاؤڈر ایمانداری سے بناتا ہے۔ جلد لانچ ہو رہا ہے۔",
    hero_cta1:"لانچ اپڈیٹس حاصل کریں", see_made:"دیکھیں کیسے بنتا ہے", launch_tag_text:"جلد لانچ ہو رہا ہے", notify_me:"مجھے مطلع کریں →",
    visit_shop:"ہماری دکان دیکھیں", feedback_btn:"WhatsApp پر رائے بھیجیں", career_apply:"ای میل سے درخواست دیں", career_apply2:"ای میل سے درخواست دیں" };

  T.gu = { nav_about:"અમારા વિશે", nav_process:"અમારી પ્રક્રિયા", nav_journey:"અમારી સફર", nav_feedback:"પ્રતિભાવ", nav_faq:"પ્રશ્નો", nav_careers:"કારકિર્દી", nav_contact:"સંપર્ક", nav_shop:"ખરીદો",
    hero_eyebrow:"કોઈ રંગ નહીં · કોઈ ફિલર નહીં", hero_h1:"દરેક વાનગી પાછળનો<br>સ્વાદ.",
    hero_lede:"AKK Spices હળદર, લાલ મરચું અને ધાણા પાવડર પ્રામાણિકતાથી બનાવે છે. ટૂંક સમયમાં લોન્ચ થઈ રહ્યું છે.",
    hero_cta1:"લોન્ચ અપડેટ્સ મેળવો", see_made:"કેવી રીતે બને છે તે જુઓ", launch_tag_text:"ટૂંક સમયમાં લોન્ચ", notify_me:"મને જણાવો →",
    visit_shop:"અમારી દુકાન જુઓ", feedback_btn:"WhatsApp પર પ્રતિભાવ મોકલો", career_apply:"ઈમેલ દ્વારા અરજી કરો", career_apply2:"ઈમેલ દ્વારા અરજી કરો" };

  T.kn = { nav_about:"ನಮ್ಮ ಬಗ್ಗೆ", nav_process:"ನಮ್ಮ ಪ್ರಕ್ರಿಯೆ", nav_journey:"ನಮ್ಮ ಪಯಣ", nav_feedback:"ಪ್ರತಿಕ್ರಿಯೆ", nav_faq:"ಪ್ರಶ್ನೆಗಳು", nav_careers:"ಉದ್ಯೋಗಗಳು", nav_contact:"ಸಂಪರ್ಕ", nav_shop:"ಖರೀದಿಸಿ",
    hero_eyebrow:"ಬಣ್ಣ ಇಲ್ಲ · ಫಿಲ್ಲರ್‌ಗಳಿಲ್ಲ", hero_h1:"ಪ್ರತಿ ಖಾದ್ಯದ ಹಿಂದಿನ<br>ರುಚಿ.",
    hero_lede:"AKK Spices ಅರಿಶಿನ, ಕೆಂಪು ಮೆಣಸಿನಕಾಯಿ ಮತ್ತು ಕೊತ್ತಂಬರಿ ಪುಡಿಯನ್ನು ಪ್ರಾಮಾಣಿಕವಾಗಿ ತಯಾರಿಸುತ್ತದೆ. ಶೀಘ್ರದಲ್ಲೇ ಬಿಡುಗಡೆ.",
    hero_cta1:"ಲಾಂಚ್ ಅಪ್‌ಡೇಟ್‌ ಪಡೆಯಿರಿ", see_made:"ಹೇಗೆ ತಯಾರಿಸಲಾಗುತ್ತದೆ ನೋಡಿ", launch_tag_text:"ಶೀಘ್ರದಲ್ಲೇ ಬಿಡುಗಡೆ", notify_me:"ನನಗೆ ತಿಳಿಸಿ →",
    visit_shop:"ನಮ್ಮ ಅಂಗಡಿ ನೋಡಿ", feedback_btn:"WhatsApp ನಲ್ಲಿ ಪ್ರತಿಕ್ರಿಯೆ ಕಳುಹಿಸಿ", career_apply:"ಇಮೇಲ್ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ", career_apply2:"ಇಮೇಲ್ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ" };

  T.or = { nav_about:"ଆମ ବିଷୟରେ", nav_process:"ଆମର ପ୍ରକ୍ରିୟା", nav_journey:"ଆମର ଯାତ୍ରା", nav_feedback:"ମତାମତ", nav_faq:"ପ୍ରଶ୍ନ", nav_careers:"କରିୟର", nav_contact:"ଯୋଗାଯୋଗ", nav_shop:"କିଣନ୍ତୁ",
    hero_eyebrow:"ରଙ୍ଗ ନାହିଁ · କୌଣସି ଫିଲର ନାହିଁ", hero_h1:"ପ୍ରତ୍ୟେକ ଖାଦ୍ୟ ପଛରେ<br>ଥିବା ସ୍ୱାଦ।",
    hero_lede:"AKK Spices ହଳଦୀ, ଲାଲ ମରିଚ ଏବଂ ଧନିଆ ଗୁଣ୍ଡ ସାଚ୍ଚୋଟତାର ସହ ତିଆରି କରେ। ଶୀଘ୍ର ଲଞ୍ଚ ହେଉଛି।",
    hero_cta1:"ଲଞ୍ଚ ଅପଡେଟ ପାଆନ୍ତୁ", see_made:"କିପରି ତିଆରି ହୁଏ ଦେଖନ୍ତୁ", launch_tag_text:"ଶୀଘ୍ର ଲଞ୍ଚ ହେଉଛି", notify_me:"ମୋତେ ଜଣାନ୍ତୁ →",
    visit_shop:"ଆମ ଦୋକାନ ଦେଖନ୍ତୁ", feedback_btn:"WhatsApp ରେ ମତାମତ ପଠାନ୍ତୁ", career_apply:"ଇମେଲ ମାଧ୍ୟମରେ ଆବେଦନ କରନ୍ତୁ", career_apply2:"ଇମେଲ ମାଧ୍ୟମରେ ଆବେଦନ କରନ୍ତୁ" };

  T.ml = { nav_about:"ഞങ്ങളെക്കുറിച്ച്", nav_process:"ഞങ്ങളുടെ പ്രക്രിയ", nav_journey:"ഞങ്ങളുടെ യാത്ര", nav_feedback:"അഭിപ്രായം", nav_faq:"ചോദ്യങ്ങൾ", nav_careers:"തൊഴിലവസരങ്ങൾ", nav_contact:"ബന്ധപ്പെടുക", nav_shop:"വാങ്ങുക",
    hero_eyebrow:"കൃത്രിമ നിറമില്ല · ഫില്ലറുകൾ ഇല്ല", hero_h1:"ഓരോ വിഭവത്തിന് പിന്നിലെ<br>രുചി.",
    hero_lede:"AKK Spices മഞ്ഞൾ, ചുവന്ന മുളക്, മല്ലി പൊടി സത്യസന്ധമായി തയ്യാറാക്കുന്നു. ഉടൻ ലോഞ്ച് ചെയ്യുന്നു.",
    hero_cta1:"ലോഞ്ച് അപ്ഡേറ്റുകൾ നേടൂ", see_made:"എങ്ങനെ ഉണ്ടാക്കുന്നു എന്ന് കാണുക", launch_tag_text:"ഉടൻ ലോഞ്ച്", notify_me:"എന്നെ അറിയിക്കൂ →",
    visit_shop:"ഞങ്ങളുടെ ഷോപ്പ് കാണുക", feedback_btn:"WhatsApp-ൽ അഭിപ്രായം അയക്കുക", career_apply:"ഇമെയിൽ വഴി അപേക്ഷിക്കുക", career_apply2:"ഇമെയിൽ വഴി അപേക്ഷിക്കുക" };

  T.pa = { nav_about:"ਸਾਡੇ ਬਾਰੇ", nav_process:"ਸਾਡੀ ਪ੍ਰਕਿਰਿਆ", nav_journey:"ਸਾਡਾ ਸਫ਼ਰ", nav_feedback:"ਸੁਝਾਅ", nav_faq:"ਸਵਾਲ", nav_careers:"ਕਰੀਅਰ", nav_contact:"ਸੰਪਰਕ", nav_shop:"ਖਰੀਦੋ",
    hero_eyebrow:"ਕੋਈ ਰੰਗ ਨਹੀਂ · ਕੋਈ ਫਿਲਰ ਨਹੀਂ", hero_h1:"ਹਰ ਪਕਵਾਨ ਪਿੱਛੇ<br>ਦਾ ਸੁਆਦ।",
    hero_lede:"AKK Spices ਹਲਦੀ, ਲਾਲ ਮਿਰਚ ਅਤੇ ਧਨੀਆ ਪਾਊਡਰ ਇਮਾਨਦਾਰੀ ਨਾਲ ਬਣਾਉਂਦਾ ਹੈ। ਜਲਦੀ ਲਾਂਚ ਹੋ ਰਿਹਾ ਹੈ।",
    hero_cta1:"ਲਾਂਚ ਅੱਪਡੇਟ ਪਾਓ", see_made:"ਦੇਖੋ ਕਿਵੇਂ ਬਣਦਾ ਹੈ", launch_tag_text:"ਜਲਦੀ ਲਾਂਚ ਹੋ ਰਿਹਾ ਹੈ", notify_me:"ਮੈਨੂੰ ਸੂਚਿਤ ਕਰੋ →",
    visit_shop:"ਸਾਡੀ ਦੁਕਾਨ ਦੇਖੋ", feedback_btn:"WhatsApp ਤੇ ਸੁਝਾਅ ਭੇਜੋ", career_apply:"ਈਮੇਲ ਰਾਹੀਂ ਅਰਜ਼ੀ ਦਿਓ", career_apply2:"ਈਮੇਲ ਰਾਹੀਂ ਅਰਜ਼ੀ ਦਿਓ" };

  T.as = { nav_about:"আমাৰ বিষয়ে", nav_process:"আমাৰ প্ৰক্ৰিয়া", nav_journey:"আমাৰ যাত্ৰা", nav_feedback:"মতামত", nav_faq:"প্ৰশ্ন", nav_careers:"কেৰিয়াৰ", nav_contact:"যোগাযোগ", nav_shop:"কিনক",
    hero_eyebrow:"ৰং নাই · কোনো ফিলাৰ নাই", hero_h1:"প্ৰতিটো খাদ্যৰ পিছফালে<br>থকা সোৱাদ।",
    hero_lede:"AKK Spices য়ে হালধি, ৰঙা জলকীয়া আৰু ধনিয়া গুড়ি সততাৰে তৈয়াৰ কৰে। সোনকালে লঞ্চ হ'ব।",
    hero_cta1:"লঞ্চ আপডেট পাওক", see_made:"কেনেকৈ তৈয়াৰ হয় চাওক", launch_tag_text:"সোনকালে লঞ্চ", notify_me:"মোক জনাওক →",
    visit_shop:"আমাৰ দোকান চাওক", feedback_btn:"WhatsApp ত মতামত পঠিয়াওক", career_apply:"ইমেইলৰ যোগেদি আবেদন কৰক", career_apply2:"ইমেইলৰ যোগেদি আবেদন কৰক" };

  T.mai = { nav_about:"हमरा बारे मे", nav_process:"हमर प्रक्रिया", nav_journey:"हमर यात्रा", nav_feedback:"प्रतिक्रिया", nav_faq:"प्रश्न", nav_careers:"करियर", nav_contact:"संपर्क", nav_shop:"खरीदू",
    hero_eyebrow:"रंग नहि · फिलर नहि", hero_h1:"हर व्यंजन के पाछू<br>के स्वाद।",
    hero_lede:"AKK Spices हरदी, लाल मिर्च आ धनिया पाउडर ईमानदारी सँ बनबैत अछि। जल्दी लॉन्च भ' रहल अछि।",
    hero_cta1:"लॉन्च अपडेट पाउ", see_made:"देखू कोना बनैत अछि", launch_tag_text:"जल्दी लॉन्च भ' रहल अछि", notify_me:"हमरा सूचित करू →",
    visit_shop:"हमर दोकान देखू", feedback_btn:"WhatsApp पर प्रतिक्रिया पठाउ", career_apply:"ईमेल सँ आवेदन करू", career_apply2:"ईमेल सँ आवेदन करू" };

  T.sa = { nav_about:"अस्माकं विषये", nav_process:"अस्माकं प्रक्रिया", nav_journey:"अस्माकं यात्रा", nav_feedback:"प्रतिक्रिया", nav_faq:"प्रश्नाः", nav_careers:"वृत्तिः", nav_contact:"सम्पर्कः", nav_shop:"क्रयणम्",
    hero_eyebrow:"वर्णरहितम् · न मिश्रितम्", hero_h1:"प्रत्येकव्यञ्जनस्य पृष्ठतः<br>स्वादः।",
    hero_lede:"AKK Spices हरिद्रा, रक्तमरिचं, धान्याकचूर्णं च सत्यतया निर्मिमीते। शीघ्रं आरभ्यते।",
    hero_cta1:"आरम्भसूचनां प्राप्नुत", see_made:"कथं निर्मीयते पश्यन्तु", launch_tag_text:"शीघ्रं आरभ्यते", notify_me:"मां सूचयन्तु →",
    visit_shop:"अस्माकं विपणिं पश्यन्तु", feedback_btn:"WhatsApp द्वारा प्रतिक्रियां प्रेषयन्तु", career_apply:"ईमेल-द्वारा आवेदनं कुर्वन्तु", career_apply2:"ईमेल-द्वारा आवेदनं कुर्वन्तु" };

  T.ks = { nav_about:"अस्य بارٕے", nav_process:"अथ کار करِنؠ", nav_journey:"अथ سفر", nav_feedback:"رایہ", nav_faq:"سوال", nav_careers:"نئکری", nav_contact:"رابطہ", nav_shop:"خرید کریو",
    hero_eyebrow:"رنگ نہٕ", hero_h1:"AKK Spices",
    hero_lede:"AKK Spices ہلدر، مرٕچ تہٕ دَنیوٕر پاؤڈر ایمانداریہٕ سٟتؠ تیار کران۔ جلدی شروع گژھان۔",
    hero_cta1:"اپڈیٹ حاصل کریو", see_made:"دِس کیازِ بنان", launch_tag_text:"جلدی شروع", notify_me:"بونہٕ خبر دیو →",
    visit_shop:"اسٕنٛز دوکان دِس", feedback_btn:"WhatsApp پؠٹھ رایہ نیندیو", career_apply:"ای-میل ذریعہٕ درخواست دیو", career_apply2:"ای-میل ذریعہٕ درخواست دیو" };

  T.ne = { nav_about:"हाम्रो बारेमा", nav_process:"हाम्रो प्रक्रिया", nav_journey:"हाम्रो यात्रा", nav_feedback:"प्रतिक्रिया", nav_faq:"प्रश्नहरू", nav_careers:"करियर", nav_contact:"सम्पर्क", nav_shop:"किन्नुहोस्",
    hero_eyebrow:"कुनै रंग छैन · कुनै फिलर छैन", hero_h1:"हरेक परिकारको पछाडिको<br>स्वाद।",
    hero_lede:"AKK Spices ले बेसार, रातो खुर्सानी र धनियाँ धुलो इमान्दारीसाथ बनाउँछ। छिट्टै सुरु हुँदैछ।",
    hero_cta1:"लन्च अपडेट पाउनुहोस्", see_made:"कसरी बनाइन्छ हेर्नुहोस्", launch_tag_text:"छिट्टै सुरु हुँदैछ", notify_me:"मलाई सूचित गर्नुहोस् →",
    visit_shop:"हाम्रो पसल हेर्नुहोस्", feedback_btn:"WhatsApp मा प्रतिक्रिया पठाउनुहोस्", career_apply:"इमेल मार्फत आवेदन दिनुहोस्", career_apply2:"इमेल मार्फत आवेदन दिनुहोस्" };

  T.kok = { nav_about:"आमचे विशीं", nav_process:"आमची प्रक्रिया", nav_journey:"आमचो प्रवास", nav_feedback:"प्रतिक्रिया", nav_faq:"प्रश्न", nav_careers:"करियर", nav_contact:"संपर्क", nav_shop:"विकत घेयात",
    hero_eyebrow:"रंग ना · फिलर ना", hero_h1:"दर एका जेवणामागील<br>चव.",
    hero_lede:"AKK Spices हळद, तांबडी मिरसांग आनी कोथिंबिरी पूड प्रामाणिकपणान तयार करता. लवकरच सुरू जाता.",
    hero_cta1:"लॉन्च अपडेट मेळयात", see_made:"कशें तयार जाता पळयात", launch_tag_text:"लवकरच सुरू", notify_me:"म्हाका कळयात →",
    visit_shop:"आमचें दुकान पळयात", feedback_btn:"WhatsApp वयर प्रतिक्रिया धाडात", career_apply:"ईमेला वरवीं अर्ज करात", career_apply2:"ईमेला वरवीं अर्ज करात" };

  T.sd = { nav_about:"اسان جي باري ۾", nav_process:"اسان جو عمل", nav_journey:"اسان جو سفر", nav_feedback:"راءِ", nav_faq:"سوال", nav_careers:"نوڪريون", nav_contact:"رابطو", nav_shop:"خريدو",
    hero_eyebrow:"رنگ ڌاران", hero_h1:"هر پَڪوان جي پويان<br>ذائقو۔",
    hero_lede:"AKK Spices هَلدي، ڳاڙهي مرچ ۽ڌاڻي پائوڊر ايمانداري سان ٺاهيندو آهي۔ جلد شروع ٿي رهيو آهي۔",
    hero_cta1:"لانچ اپڊيٽس حاصل ڪريو", see_made:"ڏسو ڪيئن ٺهي ٿو", launch_tag_text:"جلد شروع", notify_me:"مون کي ٻڌايو →",
    visit_shop:"اسان جي دڪان ڏسو", feedback_btn:"WhatsApp تي راءِ موڪليو", career_apply:"اي ميل ذريعي درخواست ڏيو", career_apply2:"اي ميل ذريعي درخواست ڏيو" };

  T.doi = { nav_about:"साढ़े बारे च", nav_process:"साढ़ी प्रक्रिया", nav_journey:"साढ़ी यात्रा", nav_feedback:"राय", nav_faq:"सवाल", nav_careers:"करियर", nav_contact:"संपर्क", nav_shop:"खरीदो",
    hero_eyebrow:"कोई रंग नेईं", hero_h1:"हर व्यंजन दे पिच्छें<br>दा सुआद।",
    hero_lede:"AKK Spices हल्दी, लाल मिर्च ते धनिया पाऊडर ईमानदारी कन्नै बनांदा ऐ। जल्दी लॉन्च होआ करदा ऐ।",
    hero_cta1:"लॉन्च अपडेट लैओ", see_made:"दिक्खो किंयां बनदा ऐ", launch_tag_text:"जल्दी लॉन्च", notify_me:"मिंजो दस्सो →",
    visit_shop:"साढ़ी दुकान दिक्खो", feedback_btn:"WhatsApp पर राय भेजो", career_apply:"ईमेल राहें अर्जी देओ", career_apply2:"ईमेल राहें अर्जी देओ" };

  T.mni = { nav_about:"ꯆꯦꯏꯕ", nav_process:"ꯆꯥꯗꯤ", nav_journey:"ꯈꯣꯡꯆꯠ", nav_feedback:"ꯄꯨꯛꯅꯤꯡ", nav_faq:"ꯋꯥꯍꯪ", nav_careers:"ꯊꯕꯛ", nav_contact:"ꯀꯟꯇꯦꯛꯠ", nav_shop:"ꯂꯩꯕ",
    hero_h1:"AKK Spices",
    hero_lede:"AKK Spices na হলদী, য়াংগাং সানা অমসুং ধনিয়া চাফু আচুম্বা ওইনা শেম্লি। থুনামক্তা হৌগনি।",
    hero_cta1:"লঞ্চ অপডেট ফংগু", see_made:"করম্না শেম্লিবগে য়েংগু", launch_tag_text:"থুনামক্তা হৌগনি", notify_me:"এইবু খংহনবিয়ু →",
    visit_shop:"এইখোয়গী দোকান য়েংগু", feedback_btn:"WhatsApp দা পুকনিং থাদোকপিয়ু", career_apply:"ইমেইলগী মতুংইন্না অপ্লাই তৌগু", career_apply2:"ইমেইলগী মতুংইন্না অপ্লাই তৌগু" };

  T.brx = { nav_about:"आं फिसाव", nav_process:"आं खान्थि", nav_journey:"आं हारि", nav_feedback:"फिनाय", nav_faq:"सवाल", nav_careers:"हाथाइ", nav_contact:"जोबथा", nav_shop:"लाथिफिन",
    hero_eyebrow:"रंग गैया", hero_h1:"जोबथानि उनाव<br>दा स्वाद।",
    hero_lede:"AKK Spices आ हल्दी, गोजौ मरिच आरो धनिया गुडि सिगां-सुगारै सोलेनो होनाय जायो। गोख्रोमबो लंचिनि।",
    hero_cta1:"लंच अपडेट मोन", see_made:"मोनसे मोनसे नाय", launch_tag_text:"गोख्रोमबो लंचिनि", notify_me:"आंखौ मिथिहो →",
    visit_shop:"आंनि दोकान नाय", feedback_btn:"WhatsApp-आव फिनाय दान", career_apply:"ईमेलजों दरखास्त होदों", career_apply2:"ईमेलजों दरखास्त होदों" };

  T.sat = { nav_about:"आबुरेन बाबते", nav_process:"आबुरेन प्रक्रिया", nav_journey:"आबुरेन सफर", nav_feedback:"बाजाब", nav_faq:"कुली", nav_careers:"चाकरी", nav_contact:"जगाहजाग", nav_shop:"किरिन मे",
    hero_h1:"AKK Spices",
    hero_lede:"AKK Spices ओड़ोक हलदी, अराक मरिच आर धनिया गुड़ी सारी लेखा तेयार याः। लाहा एतोहोब।",
    hero_cta1:"अपडेट नाम मे", see_made:"चेत लेखा बना कान कुली नेल मे", launch_tag_text:"लाहा एतोहोब", notify_me:"इञाक खबर एमा मे →",
    visit_shop:"आलेरेन दोकान नेल मे", feedback_btn:"WhatsApp रे बाजाब कुल मे", career_apply:"ईमेल रे आवेदन मे", career_apply2:"ईमेल रे आवेदन मे" };

  // -------- Apply logic (used on every page that includes this script) --------
  function getLang(){ try { return localStorage.getItem('akk_lang') || 'en'; } catch(e){ return 'en'; } }
  function setLangPref(l){ try { localStorage.setItem('akk_lang', l); } catch(e){} }

  function applyLang(code){
    var dict = T[code] || {};
    var base = T.en;
    document.documentElement.setAttribute('lang', code === 'en' ? 'en' : code);

    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var key = el.getAttribute('data-i18n');
      var val = dict[key] || base[key];
      if (val !== undefined) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el){
      var key = el.getAttribute('data-i18n-html');
      var val = dict[key] || base[key];
      if (val !== undefined) el.innerHTML = val;
    });

    var labelEl = document.getElementById('akk-lang-label');
    if (labelEl){
      var found = LANGS.filter(function(l){ return l.code === code; })[0];
      labelEl.textContent = found ? found.native : 'English';
    }
    setLangPref(code);
  }

  function buildSwitcher(){
    var mount = document.getElementById('akk-lang-switch');
    if (!mount) return;
    var html = '<button class="lang-btn" id="akk-lang-btn" type="button" aria-haspopup="listbox" aria-expanded="false">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>' +
      '<span id="akk-lang-label">English</span></button><ul class="lang-menu" id="akk-lang-menu" role="listbox"></ul>';
    mount.innerHTML = html;
    var menu = document.getElementById('akk-lang-menu');
    LANGS.forEach(function(l){
      var li = document.createElement('li');
      li.textContent = l.native;
      li.setAttribute('role','option');
      li.setAttribute('data-code', l.code);
      li.addEventListener('click', function(){
        applyLang(l.code);
        menu.classList.remove('open');
      });
      menu.appendChild(li);
    });
    var btn = document.getElementById('akk-lang-btn');
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      menu.classList.toggle('open');
    });
    document.addEventListener('click', function(){ menu.classList.remove('open'); });
  }

  document.addEventListener('DOMContentLoaded', function(){
    buildSwitcher();
    applyLang(getLang());
  });
})();
