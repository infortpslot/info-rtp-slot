'use babel';

import InfoRtpSlotView from './info-rtp-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  infoRtpSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.infoRtpSlotView = new InfoRtpSlotView(state.infoRtpSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.infoRtpSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'info-rtp-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.infoRtpSlotView.destroy();
  },

  serialize() {
    return {
      infoRtpSlotViewState: this.infoRtpSlotView.serialize()
    };
  },

  toggle() {
    console.log('InfoRtpSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
