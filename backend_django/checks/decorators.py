from django.contrib.auth.decorators import user_passes_test

def admin_required(view_func):
    return user_passes_test(lambda u: u.groups.filter(name='admin').exists())(view_func)

def technician_required(view_func):
    return user_passes_test(lambda u: u.groups.filter(name='technicien').exists())(view_func)
