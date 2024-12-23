from django.contrib import admin
from .models import Mesa, Empleado, Menu, Pedido, DetallePedido, Inventario, Usuarios, Menu, IngredienteMenu

admin.site.register(Mesa)
admin.site.register(Empleado)
admin.site.register(Menu)
admin.site.register(Pedido)
admin.site.register(DetallePedido)
admin.site.register(Inventario)
admin.site.register(Usuarios)
admin.site.register(IngredienteMenu)
