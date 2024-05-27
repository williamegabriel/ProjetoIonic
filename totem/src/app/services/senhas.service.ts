import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SenhasService {
  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public tempoExpediente: number = 9;
  public inputNovaSenha: string = '';
  public senhasArray: any = {
    SG: [],
    SP: [],
    SE: [],
  };
  public vetorSenhas: string[] = [];
  public vetorSenhasChamadas: string[] = [];
  public senhasAtendidasPrioridade=0;

  somaGeral() {
    this.senhasGeral++;
    this.senhasTotal++;
  }
  somaPrior() {
    this.senhasPrior++;
    this.senhasTotal++;
  }
  somaExame() {
    this.senhasExame++;
    this.senhasTotal++;
  }

  novaSenha(tipoSenha: string = '') {
    if (tipoSenha == 'SG') {
      this.somaGeral();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        (new Date().getMonth() + 1).toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SG'].length + 1).toString().padStart(2, '0');
      this.senhasArray.SG.push(this.inputNovaSenha);
      this.vetorSenhas.push(this.inputNovaSenha);

    } else if (tipoSenha == 'SP') {
      this.somaPrior();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        (new Date().getMonth() + 1).toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SP'].length + 1).toString().padStart(2, '0');
      this.senhasArray.SP.push(this.inputNovaSenha);
      this.vetorSenhas.push(this.inputNovaSenha);

    } else if (tipoSenha == 'SE') {
      this.somaExame();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        (new Date().getMonth() + 1).toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SE'].length + 1).toString().padStart(2, '0');
      this.senhasArray.SE.push(this.inputNovaSenha);
      this.vetorSenhas.push(this.inputNovaSenha);

    }

    console.log(this.senhasArray);
  }

  public senhasAtendidas = 0;
  public naoAtenda = 0;

  atenderSenha() {
    if (this.tempoExpediente <= 0) {
      this.descartarSenhas();
      this.tempoExpediente=600;
      return
    }else{
    if (this.naoAtenda == 0 && this.senhasArray.SP.length > 0) {

      const senhaAtendida = this.senhasArray.SP.shift();
      const index = this.vetorSenhas.indexOf(senhaAtendida);
      if (index !== -1) {
        this.vetorSenhas.splice(index, 1);
      }

      this.tempoExpediente -= 15 + Math.floor(Math.random() * 11) + -5;
      this.senhasAtendidasPrioridade++
      this.senhasAtendidas++;
      this.naoAtenda = 1;
      this.consoleLogs();
      return

    } else if (this.senhasArray.SE.length > 0) {

      const senhaAtendida = this.senhasArray.SE.shift();
      const index = this.vetorSenhas.indexOf(senhaAtendida);


      if (index !== -1) {
        this.vetorSenhas.splice(index, 1);
      }

      this.tempoExpediente -= 1;
      this.senhasAtendidas++;
      this.naoAtenda = 0;
      this.consoleLogs();
      return
    } else if (this.senhasArray.SG.length > 0) {

      const senhaAtendida = this.senhasArray.SG.shift();
      const index = this.vetorSenhas.indexOf(senhaAtendida);
      if (index !== -1) {
        this.vetorSenhas.splice(index, 1);
      }

        this.tempoExpediente -= 5 + Math.floor(Math.random() * 7) - 3;
        this.senhasAtendidas++;
        this.naoAtenda = 0;
        this.consoleLogs();
        return
      }



    console.log(this.naoAtenda);
    console.log(this.tempoExpediente);
    console.log(this.senhasArray);

  }}

  descartarSenhas() {
    this.senhasArray.SG = [];
    this.senhasArray.SP = [];
    this.senhasArray.SE = [];
    this.senhasGeral = 0;
    this.senhasPrior = 0;
    this.senhasExame = 0;
    this.senhasTotal = 0;
    this.vetorSenhas.length=0;

    alert('EXPEDIENTE ENCERRADO');
  }

  consoleLogs() {
    console.log(this.naoAtenda);
    console.log(this.tempoExpediente);
    console.log(this.senhasArray);
  }

  get todasSenhas() {
    return [
      ...this.senhasArray.SG,
      ...this.senhasArray.SP,
      ...this.senhasArray.SE,
    ];
  }
}
