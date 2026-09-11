/* ------------------------------------------------------------------
   GRS Dental Care — site behaviour
   ------------------------------------------------------------------ */

/* Mobile menu */
(function () {
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('nav');
  if (!burger || !nav) return;
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
})();

/* Current year in the footer */
(function () {
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();

/* ------------------------------------------------------------------
   Appointment form
   ------------------------------------------------------------------
   The site is static, so there is no server to receive the form.
   Two options, in order of effort:

   1. WhatsApp (works right now, zero setup) — leave FORM_ENDPOINT as ''
      and the form opens WhatsApp with the request pre-typed.

   2. Email (needs a free account) — sign up at web3forms.com or
      formspree.io, paste the URL they give you into FORM_ENDPOINT
      below, and requests arrive in your inbox instead.
   ------------------------------------------------------------------ */

var FORM_ENDPOINT = '';                 // e.g. 'https://api.web3forms.com/submit'
var WHATSAPP_NUMBER = '918807754007';   // country code + number, no + or spaces

(function () {
  var form = document.getElementById('booking');
  if (!form) return;

  var state = document.getElementById('formstate');

  function say(kind, msg) {
    state.className = 'formstate show ' + kind;
    state.textContent = msg;
    state.scrollIntoView({ block: 'nearest' });
  }

  function collect() {
    var d = new FormData(form);
    return {
      name: (d.get('name') || '').trim(),
      phone: (d.get('phone') || '').trim(),
      reason: d.get('reason') || 'Not specified',
      preferred: d.get('preferred') || 'No preference',
      date: d.get('date') || 'No date given',
      notes: (d.get('notes') || '').trim()
    };
  }

  function asMessage(v) {
    return 'Appointment request — GRS Dental Care\n\n'
      + 'Name: ' + v.name + '\n'
      + 'Phone: ' + v.phone + '\n'
      + 'Reason: ' + v.reason + '\n'
      + 'Preferred day: ' + v.date + '\n'
      + 'Preferred time: ' + v.preferred + '\n'
      + (v.notes ? 'Notes: ' + v.notes : '');
  }

  function openWhatsApp() {
    if (!form.reportValidity()) return;
    var v = collect();
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(asMessage(v)), '_blank');
    say('ok', 'WhatsApp is opening with your request typed out. Press send there and we will confirm your slot.');
  }

  var waBtn = document.getElementById('wa-send');
  if (waBtn) waBtn.addEventListener('click', openWhatsApp);

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!FORM_ENDPOINT) { openWhatsApp(); return; }

    var btn = form.querySelector('button[type="submit"]');
    var label = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(collect())
    })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        form.reset();
        say('ok', 'Request received. We will call you on the number you gave to confirm the time.');
      })
      .catch(function () {
        say('bad', 'That did not go through. Call 88077 54007 or use the WhatsApp button below instead.');
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = label;
      });
  });

  /* Stop people picking a date in the past */
  var dateField = form.querySelector('input[type="date"]');
  if (dateField) dateField.min = new Date().toISOString().split('T')[0];
})();
