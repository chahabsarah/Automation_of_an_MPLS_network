from django import forms
from .models import Router,NetworkConfiguration,SignUp

class RouterForm(forms.ModelForm):
    class Meta:
        model = Router
        fields = ['host', 'port', 'username', 'password']

class NetworkConfigurationForm(forms.ModelForm):
    class Meta:
        model = NetworkConfiguration
        fields = ['clientname', 'interface', 'ip_address', 'subnet','vrf','members_target','route_distinguisher']
        exclude = ['status','router_key']  # Exclude the status field

class SignUpForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirm Password', widget=forms.PasswordInput)

    class Meta:
        model = SignUp
        fields = ('username', 'email', 'password1', 'password2')

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")

        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords do not match")

        return cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)
        user.password1 = self.cleaned_data["password1"]
        if commit:
            user.save()
        return user
    
class LoginForm(forms.Form):
    username = forms.CharField(max_length=150)
    password = forms.CharField(widget=forms.PasswordInput)

