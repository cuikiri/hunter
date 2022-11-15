package br.com.jhisolution.user.hunters.domain;

import static org.assertj.core.api.Assertions.assertThat;

import br.com.jhisolution.user.hunters.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VotoNaoDecisaoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VotoNaoDecisao.class);
        VotoNaoDecisao votoNaoDecisao1 = new VotoNaoDecisao();
        votoNaoDecisao1.setId(1L);
        VotoNaoDecisao votoNaoDecisao2 = new VotoNaoDecisao();
        votoNaoDecisao2.setId(votoNaoDecisao1.getId());
        assertThat(votoNaoDecisao1).isEqualTo(votoNaoDecisao2);
        votoNaoDecisao2.setId(2L);
        assertThat(votoNaoDecisao1).isNotEqualTo(votoNaoDecisao2);
        votoNaoDecisao1.setId(null);
        assertThat(votoNaoDecisao1).isNotEqualTo(votoNaoDecisao2);
    }
}
