import re
from django import forms
from .models import Usuario

class UsuarioAPIForm(forms.ModelForm):
    senha = forms.CharField(required=True)

    class Meta:
        model = Usuario
        fields = ['nome', 'cpf', 'email', 'tipo_usuario', 'senha']

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if Usuario.objects.filter(email=email).exclude(pk=self.instance.pk).exists():
            raise forms.ValidationError("Este e-mail já está cadastrado.")
        return email

    def clean_cpf(self):
        cpf = self.cleaned_data.get('cpf')
        cpf = re.sub(r'\D', '', cpf)
        if Usuario.objects.filter(cpf=cpf).exclude(pk=self.instance.pk).exists():
            raise forms.ValidationError("Este CPF já está cadastrado.")
        return cpf

    def clean_senha(self):
        senha = self.cleaned_data.get('senha')
        if len(senha) < 8:
            raise forms.ValidationError("A senha deve ter no mínimo 8 caracteres.")
        if not re.search(r'[A-Z]', senha):
            raise forms.ValidationError("A senha deve conter ao menos 1 letra maiúscula.")
        if not re.search(r'[0-9]', senha):
            raise forms.ValidationError("A senha deve conter ao menos 1 número.")
        return senha