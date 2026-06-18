# Guia de Contribuição (Contributing Guide)

Agradecemos o seu interesse em contribuir com este template de projeto DevOps! Para manter a qualidade do código e a integridade da pipeline, por favor siga estas diretrizes:

## Como Contribuir

1. **Faça um Fork** do repositório.
2. **Crie uma branch** para sua alteração:
   - Para novas funcionalidades: `git checkout -b feature/minha-feature`
   - Para correções rápidas: `git checkout -b FIX` (ou `fix-*` / `hotfix/*`), o que ativa a automação de abertura de PR.
3. **Faça suas alterações** e adicione testes correspondentes em `/tests`.
4. **Valide localmente** usando o Docker Compose:
   ```bash
   docker-compose up --build
   ```
5. **Faça o Commit** seguindo padrões claros (ex: Commits Convencionais).
6. **Abra um Pull Request** detalhando suas mudanças por meio do nosso template de PR.

## Padrões de Commit

Utilizamos commits semânticos simplificados para manter o histórico limpo:
- `feat: ...` para novas funcionalidades.
- `fix: ...` para correção de bugs.
- `docs: ...` para alterações de documentação.
- `chore: ...` para tarefas administrativas ou de build/CI.
