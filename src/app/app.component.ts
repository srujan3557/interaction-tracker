import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { TrackerInit, TrackerService } from './../../dist/_tracker/v1.0.0/tracker.snippet.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Interaction Tracker';
  checked = false;
  panelOpenState = false;

  ngOnInit() {
    const Authorization = '';
    const ppr = '1865277';
    const deltaId = 's65277';
    const deltamatic = '01865277';
    const channelId = 'OMP';
    const appId = '01';
    const sessionId = '<USER_SESSION>';
    const endpoint = 'http://localhost:3000/analytics';
    const commId = '<COMM_ID>';
    const commTyp = '<COMM_TYPE>';
    TrackerInit(
      Authorization,
      ppr,
      deltaId,
      deltamatic,
      channelId,
      appId,
      sessionId,
      endpoint,
      commId,
      commTyp,
      ['1865271', '1965588'] // should come from hosting APP config
    );
  }

  checkboxEvent($event: any) {
    const e = $event ? 'CHECKED' : 'UNCHECKED';
    const data = {
      description: '<DESCRIPTION>'
    };
    TrackerService('<CUSTOMER_ID>', '2339754760', '<TICKET_NUM>', 'POLICY', e, 'CHECKBOX', JSON.stringify(data));
  }

  calendarEvent(type: string, $event: MatDatepickerInputEvent<Date>) {
    const data = {
      description: '<DESCRIPTION>'
    };
    TrackerService('<CUSTOMER_ID>', '2339754760', '<TICKET_NUM>', 'BOOKING', 'SELECT/INPUT', 'CALENDAR', JSON.stringify(data));
  }

  radioCheckEvent($event: any) {
    const e = $event.value;
    const data = {
      description: '<DESCRIPTION>'
    };
    TrackerService('<CUSTOMER_ID>', '2339754760', '<TICKET_NUM>', 'OPTIONAL', 'RADIO_CHECK', 'SEAT SELECTION', JSON.stringify(data));
  }

  inputEvent($event: any) {
    const e = $event.value;
    const data = {
      description: '<DESCRIPTION>'
    };
    TrackerService('<CUSTOMER_ID>', '2339754760', '<TICKET_NUM>', 'SEARCH FORM', 'BLUR', 'INPUT', JSON.stringify(data));
  }

  dropdownEvent($event: any) {
    console.log($event);
    const e = $event.value;
    const data = {
      description: '<DESCRIPTION>'
    };
    TrackerService('<CUSTOMER_ID>', '2339754760', '<TICKET_NUM>', 'SEARCH_FORM', 'SELECT', 'DROPDOWN', JSON.stringify(data));
  }

  textareaEvent($event: any) {
    const e = $event.value;
    const data = {
      description: '<DESCRIPTION>'
    };
    TrackerService('<CUSTOMER_ID>', '2339754760', '<TICKET_NUM>', 'PROFILE FROM', 'FOCUS', 'TEXTAREA', JSON.stringify(data));
  }

  slideToggleEvent($event: any) {
    const e = $event.value;
    const data = {
      description: '<DESCRIPTION>'
    };
    TrackerService('<CUSTOMER_ID>', '2339754760', '<TICKET_NUM>', 'CONTRAST', 'SWITCH', 'CONTRAST VIEW', JSON.stringify(data));
  }

  panelTriggerEvent(state: boolean) {
    this.panelOpenState = state;
    const data = {
      description: '<DESCRIPTION>'
    };
    TrackerService('<CUSTOMER_ID>', '2339754760', '<TICKET_NUM>', 'CEVC', 'OPEN', 'CEVC Panel', JSON.stringify(data));
  }

  onTabClickEvent($event: any) {
    const e = $event.value;
    const data = {
      description: '<DESCRIPTION>'
    };
    TrackerService('<CUSTOMER_ID>', '2339754760', '<TICKET_NUM>', 'Flight', 'TAB', 'PastFlight', JSON.stringify(data));
  }

  toggleClickEvent() {
    const data = {
      description: '<DESCRIPTION>'
    };
    TrackerService('<CUSTOMER_ID>', '2339754760', '<TICKET_NUM>', 'DETAILS BUTTON', 'CLICK', 'SK MODAL', JSON.stringify(data));
  }

}
