import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-seguimiento',
  imports: [CommonModule],
  templateUrl: './agregar-seguimiento.component.html'
})
export class AgregarSeguimientoComponent {
  usuario = {
    nombre: '',
    apellido: '',
    rol: '',
    usuario: '',
    contrasena: ''
  };

  roles = ['Seguimiento', 'Usuario'];
  private readonly LOCAL_STORAGE_KEY = 'usuariosRegistrados';

  constructor(
    public dialogRef: MatDialogRef<AgregarSeguimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  guardar(): void {
    if (this.validarCampos()) {
      this.guardarUsuarioEnLocalStorage();
      this.dialogRef.close(this.usuario);
    } else {
      alert('Por favor complete todos los campos');
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
  
  private validarCampos(): boolean {
    return !!this.usuario.nombre && !!this.usuario.apellido && 
           !!this.usuario.rol && !!this.usuario.usuario && 
           !!this.usuario.contrasena;
  }

  private guardarUsuarioEnLocalStorage(): void {
    const usuarios = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY) || '[]');
    
    usuarios.push({
      ...this.usuario,
      id: this.generarIdUnico()
    });
    
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(usuarios));
  }

  private generarIdUnico(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}