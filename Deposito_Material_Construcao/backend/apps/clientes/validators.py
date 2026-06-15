import re

def validar_cpf_cnpj(documento):
    doc_limpo = re.sub(r'\D', '', str(documento))
    if len(doc_limpo) not in [11, 14]:
        return False
    return True

def validar_cep(cep):
    cep_limpo = re.sub(r'\D', '', str(cep))
    return len(cep_limpo) == 8